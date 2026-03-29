# /performance-audit — Website Performance Audit

You are a senior performance engineer auditing the Keating Builders website for speed, efficiency, and Core Web Vitals readiness.

A slow website loses clients. Performance IS design.

---

## Audit Areas

### 1. Core Web Vitals Assessment

Analyze the codebase to predict and assess:

**LCP (Largest Contentful Paint) — target: < 2.5s**
- What is the LCP element? (Usually the hero image or largest heading)
- Is the LCP image preloaded with `<link rel="preload">`?
- Does the LCP image have `fetchpriority="high"`?
- Is the LCP image properly sized and in WebP format?

**CLS (Cumulative Layout Shift) — target: < 0.1**
- Do all images and videos have explicit `width` and `height` attributes?
- Are web fonts causing FOUT/FOIT layout shifts? (Use `font-display: swap` or `optional`)
- Are any elements injected above-the-fold dynamically?

**INP (Interaction to Next Paint) — target: < 200ms**
- Are there heavy JavaScript operations on the main thread?
- Are event listeners properly optimized? (debouncing, passive listeners)
- Are animations using `transform` and `opacity` only (GPU-composited)?

### 2. Asset Optimization

**Images**
- File sizes (flag anything over: hero 300KB, section images 150KB, thumbnails 80KB)
- Format: WebP with `<picture>` fallback for JPG/PNG
- Are `srcset` and `sizes` used for responsive images?
- Is `loading="lazy"` on all below-the-fold images?

**CSS**
- Total CSS size (target < 50KB uncompressed for critical path)
- Is critical CSS inlined in `<head>`?
- Are unused CSS rules present? (check for dead component styles)
- Is any CSS render-blocking the page?

**JavaScript**
- Is any JS in `<head>` without `defer` or `async`?
- What is the total JS bundle size?
- Are third-party scripts loaded lazily?
- Are heavy libraries (Three.js, Swiper, etc.) loaded only on pages that need them?

**Fonts**
- Are fonts self-hosted or loaded from Google Fonts CDN?
- Is only the minimum set of font weights loaded?
- Is `font-display: swap` or `font-display: optional` set?
- Are font files preloaded for critical fonts?

### 3. HTML & Server

**HTML**
- Is the HTML minified?
- Are there excessive DOM nodes? (> 1500 nodes is a performance warning)
- Are there any synchronous `document.write()` calls?

**Caching & Compression**
- Are cache headers appropriate for static assets?
- Is Gzip or Brotli compression enabled on the server?

### 4. Third-Party Scripts
List all third-party scripts (analytics, maps, chat, etc.) and assess:
- Is each one necessary?
- Is it loaded with `async` or `defer`?
- Does it block the main thread significantly?

---

## Output

Score each area and for every issue:
- **Impact:** High / Medium / Low (on Core Web Vitals)
- **Location:** File + line
- **Current state**
- **Fix:** Specific code change or configuration

End with a **Performance Budget** recommendation and a prioritized fix list.
