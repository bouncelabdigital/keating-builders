# /screenshot — Capture Breakpoint Screenshots

You are capturing visual screenshots of the Keating Builders website at four standard breakpoints for design review.

---

## Process

### Step 1: Detect the Local Server
Check if a local development server is already running. Common ports to check: 3000, 8080, 8000, 5500, 5173, 4321.

If no server is running, start one using the most appropriate method for this project:
- Static HTML: `python3 -m http.server 8080` or use `npx serve`
- Node project: check `package.json` for the start script

### Step 2: Determine What to Capture
From `$ARGUMENTS`, determine which page(s) to screenshot:
- If no argument: capture `index.html` (homepage)
- If a page name is given (e.g. `/screenshot about`): capture that page
- If "all" is given: capture all pages in the site

### Step 3: Capture Screenshots

Use Playwright (or the available browser automation tool) to capture the page at these exact viewport widths:

| Breakpoint | Width | Height | Filename Suffix |
|---|---|---|---|
| Mobile | 375px | 812px | `-mobile` |
| Tablet | 768px | 1024px | `-tablet` |
| Desktop | 1280px | 900px | `-desktop` |
| Wide | 1920px | 1080px | `-wide` |

Save each screenshot to `screenshots/[page-name]-[breakpoint]-[timestamp].png`

Example: `screenshots/home-mobile-2024-01-15.png`

### Step 4: Display Screenshots
Show all four screenshots inline for immediate visual review.

### Step 5: Provide Observations

After capturing, briefly note:
- Any obvious layout issues visible at any breakpoint
- Anything that looks significantly different from the design intent
- Specific issues to investigate (e.g. "Navigation appears broken at mobile")

Do NOT attempt to fix issues in this skill — just document them. Use `/responsive-audit` for a full fix pass.

---

## Playwright Setup (if not installed)

If Playwright is not available:
```bash
npm init -y
npm install playwright
npx playwright install chromium
```

Then use:
```js
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:8080');
await page.screenshot({ path: 'screenshots/home-mobile.png', fullPage: true });
await browser.close();
```
