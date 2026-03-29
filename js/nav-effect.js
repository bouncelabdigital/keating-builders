/* ============================================================
   KEATING BUILDERS — NAV DROPDOWN WebGL EFFECT
   Wood grain texture + CNC laser-cut line on hover.
   The grain drifts slowly at idle; hovering a link draws
   a glowing brand-green laser at that link's height,
   illuminating the grain and charring the wood around it.
   ============================================================ */

(function initDropdownEffect() {
  'use strict';

  const dropdown = document.querySelector('.nav__dropdown');
  if (!dropdown) return;

  /* ── Canvas ─────────────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position:      'absolute',
    inset:         '0',
    width:         '100%',
    height:        '100%',
    zIndex:        '0',
    pointerEvents: 'none',
    opacity:       '0',
    transition:    'opacity 0.35s ease',
    clipPath:      'inset(0 round 8px)',
  });
  dropdown.insertBefore(canvas, dropdown.firstChild);

  dropdown.querySelectorAll('.nav__dropdown-link').forEach(el => {
    el.style.position = 'relative';
    el.style.zIndex   = '1';
  });

  /* ── WebGL ──────────────────────────────────────────────── */
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const VERT = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    #define PI 3.14159265

    uniform float u_time;
    uniform vec2  u_res;
    uniform float u_hoverY;    /* 0..1 normalised centre of hovered link  */
    uniform float u_hoverAmt;  /* 0..1 eased                              */
    uniform float u_linkH;     /* 0..1 normalised height of one link      */

    float hash(vec2 p) {
      p = fract(p * vec2(127.1, 311.7));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1,0)), f.x),
        mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
        f.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0, w = 0.5;
      for (int i = 0; i < 5; i++) {
        v += w * noise(p);
        p  = p * 2.07 + vec2(1.9, 0.7);
        w *= 0.5;
      }
      return v;
    }

    void main() {
      vec2  uv = gl_FragCoord.xy / u_res;
      float t  = u_time * 0.055;

      /* ── Wood grain (black hardwood — tight, close grain) ── */
      float warp   = fbm(uv * vec2(1.8, 3.5) + vec2(t, t * 0.4)) * 3.5;
      float coarse = sin((uv.y * 38.0 + warp) * PI) * 0.5 + 0.5;
      float mid    = sin((uv.y * 140.0 + fbm(uv * vec2(2.0, 8.0) + t) * 3.0) * PI) * 0.5 + 0.5;
      float fine   = fbm(uv * vec2(80.0, 6.0) + t * 0.6);
      vec2  kc     = vec2(0.28, 0.55);
      float kDist  = length((uv - kc) * vec2(1.0, 1.6));
      float knot   = smoothstep(0.14, 0.01, kDist) * (sin(kDist * 36.0) * 0.5 + 0.5);
      float wood   = coarse * 0.30 + mid * 0.38 + fine * 0.26 + knot * 0.06;

      /* ── Link band mask (WebGL y=0 is bottom, so flip hoverY) ── */
      float cy     = 1.0 - u_hoverY;
      float halfH  = u_linkH * 0.5;
      float edge   = u_linkH * 0.08;          /* soft edge width           */
      float mask   = smoothstep(cy - halfH - edge, cy - halfH + edge, uv.y)
                   * smoothstep(cy + halfH + edge, cy + halfH - edge, uv.y);
      mask *= u_hoverAmt;

      /* ── Warm light model ───────────────────────────────── */
      /* Horizontal: light source slightly left of centre, wide falloff  */
      float hLight = 1.0 - smoothstep(0.0, 1.1, abs(uv.x - 0.38));

      /* Vertical: peaks at link centre, soft rolloff within the band    */
      float vDist  = abs(uv.y - cy) / (halfH + 0.001);
      float vLight = pow(max(0.0, 1.0 - vDist * vDist), 0.6);

      float light  = hLight * vLight * mask;

      /* ── Colours (brand dark + smoky white grain) ───────── */
      vec3 base  = vec3(0.094, 0.090, 0.067); /* brand #181711 — dark base */
      vec3 smoke = vec3(0.72,  0.70,  0.67);  /* cool smoky white grain    */

      /* Light additively lifts pale grain lines out of the dark wood;
         shadow areas stay pure brand dark                                  */
      vec3 litSurface = base + smoke * (light * wood * 0.32);

      gl_FragColor = vec4(litSurface, 1.0);
    }
  `;

  /* ── Compile ────────────────────────────────────────────── */
  function mkShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   VERT));
  gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uTime     = gl.getUniformLocation(prog, 'u_time');
  const uRes      = gl.getUniformLocation(prog, 'u_res');
  const uHoverY   = gl.getUniformLocation(prog, 'u_hoverY');
  const uHoverAmt = gl.getUniformLocation(prog, 'u_hoverAmt');
  const uLinkH    = gl.getUniformLocation(prog, 'u_linkH');

  /* ── State ──────────────────────────────────────────────── */
  let hoverY   = 0.5,  targetY   = 0.5;
  let hoverAmt = 0.0,  targetAmt = 0.0;
  let isOpen   = false;
  let rafId    = null;
  let t0       = null;

  function resize() {
    const r = dropdown.getBoundingClientRect();
    canvas.width  = Math.round(r.width);
    canvas.height = Math.round(r.height);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function render(ts) {
    if (!isOpen) { rafId = null; return; }
    rafId = requestAnimationFrame(render);
    if (!t0) t0 = ts;

    hoverAmt += (targetAmt - hoverAmt) * 0.09;
    hoverY   += (targetY   - hoverY)   * 0.10;

    gl.uniform1f(uTime,     (ts - t0) / 1000);
    gl.uniform2f(uRes,      canvas.width, canvas.height);
    gl.uniform1f(uHoverY,   hoverY);
    gl.uniform1f(uHoverAmt, hoverAmt);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /* ── Open / close tracking ──────────────────────────────── */
  const wrap = dropdown.closest('.nav__dropdown-wrap');
  if (!wrap) return;

  const links   = Array.from(dropdown.querySelectorAll('.nav__dropdown-link'));
  const numLinks = links.length;

  /* Set link-height uniform once — it's constant */
  gl.useProgram(prog);
  gl.uniform1f(uLinkH, 1.0 / numLinks);

  new MutationObserver(() => {
    isOpen = wrap.classList.contains('is-open');
    if (isOpen) {
      resize();
      canvas.style.opacity = '1';
      if (!rafId) { t0 = null; rafId = requestAnimationFrame(render); }
    } else {
      canvas.style.opacity = '0';
      targetAmt = 0;
    }
  }).observe(wrap, { attributes: true, attributeFilter: ['class'] });

  links.forEach((link, i) => {
    link.addEventListener('mouseenter', () => {
      targetY   = (i + 0.5) / numLinks;
      targetAmt = 1.0;
    });
    link.addEventListener('mouseleave', () => {
      targetAmt = 0.0;
    });
  });

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => { if (isOpen) resize(); }).observe(dropdown);
  }
})();
