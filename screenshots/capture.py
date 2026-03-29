#!/usr/bin/env python3
"""Full-page screenshot via Chrome CDP — waits for loadEventFired"""
import subprocess, time, json, base64, os
import urllib.request
import websocket

CHROME   = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT      = os.path.dirname(os.path.abspath(__file__))
URL      = "http://localhost:8787"

VIEWPORTS = [
    {"label": "mobile",  "width": 375,  "height": 812},
    {"label": "tablet",  "width": 768,  "height": 1024},
    {"label": "desktop", "width": 1280, "height": 900},
    {"label": "wide",    "width": 1920, "height": 1080},
]

def run(ws, method, params=None, expect_id=None):
    """Send a CDP command and collect replies, returning result when id matches."""
    import uuid
    mid = str(uuid.uuid4())[:8]
    ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
    ws.settimeout(20)
    for _ in range(100):
        try:
            raw = json.loads(ws.recv())
        except Exception:
            break
        if raw.get("id") == mid:
            return raw.get("result", {})
    return {}

def wait_for_load(ws, timeout=10):
    """Drain messages until Page.loadEventFired or timeout."""
    ws.settimeout(timeout)
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            msg = json.loads(ws.recv())
            if msg.get("method") == "Page.loadEventFired":
                return True
        except Exception:
            break
    return False

for vp in VIEWPORTS:
    label = vp["label"]
    w, h  = vp["width"], vp["height"]
    out_path = os.path.join(OUT, f"home-{label}-full.png")

    proc = subprocess.Popen([
        CHROME,
        "--headless=new",
        "--remote-debugging-port=9229",
        "--disable-gpu",
        "--no-sandbox",
        "--remote-allow-origins=*",
        "--disable-web-security",
        f"--window-size={w},{h}",
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)

    try:
        pages  = json.loads(urllib.request.urlopen("http://localhost:9229/json").read())
        ws_url = pages[0]["webSocketDebuggerUrl"]
        ws     = websocket.create_connection(ws_url, timeout=20)

        run(ws, "Page.enable")

        # Set device metrics
        run(ws, "Emulation.setDeviceMetricsOverride", {
            "width": w, "height": h,
            "deviceScaleFactor": 1,
            "mobile": w < 600,
        })

        # Navigate
        run(ws, "Page.navigate", {"url": URL})
        wait_for_load(ws, timeout=8)
        time.sleep(1.5)  # allow fonts/CSS animations to settle

        # Get real page dimensions via JS
        dims = run(ws, "Runtime.evaluate", {
            "expression": "JSON.stringify({w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight})",
            "returnByValue": True,
        })
        dim_val = dims.get("result", {}).get("value", "{}")
        try:
            page_dims = json.loads(dim_val)
            full_h = page_dims.get("h", h)
        except Exception:
            full_h = h * 5

        print(f"  {label}: content h = {full_h}px")

        # Expand viewport to full height
        run(ws, "Emulation.setDeviceMetricsOverride", {
            "width": w, "height": full_h,
            "deviceScaleFactor": 1,
            "mobile": w < 600,
        })
        time.sleep(0.5)

        # Capture
        ws.settimeout(30)
        result = run(ws, "Page.captureScreenshot", {
            "format": "png",
            "captureBeyondViewport": True,
        })
        ws.close()

        data = base64.b64decode(result.get("data", ""))
        if data:
            with open(out_path, "wb") as f:
                f.write(data)
            print(f"  Saved: home-{label}-full.png ({len(data)//1024}KB)")
        else:
            print(f"  No data returned for {label}")

    except Exception as e:
        print(f"  ERROR on {label}: {type(e).__name__}: {e}")
    finally:
        try: ws.close()
        except: pass
        proc.terminate()
        time.sleep(1.5)

print("\nDone.")
