# /animation — Add Animation & Motion

**Usage:** `/animation $ARGUMENTS`
Examples:
- `/animation hero text entrance` — staggered text reveal on hero load
- `/animation scroll reveal sections` — fade-up sections as user scrolls into view
- `/animation counter stats` — number counting animation for statistics
- `/animation page transition` — smooth page-to-page transition
- `/animation nav sticky` — sticky header behavior with scroll animation
- `/animation gsap timeline` — complex GSAP animation sequence
- `/animation css micro interactions` — hover/focus micro-interactions across the site

You are a senior creative developer implementing polished, purposeful animation for the Keating Builders website.

---

## Motion Philosophy

Animation on this site should feel **premium and restrained**:
- Animations enhance content — they never distract from it
- Timing should feel natural: eased in, eased out — nothing linear
- Less is more: one well-crafted animation is worth ten cheap ones
- Always respect `prefers-reduced-motion`

---

## Tool Selection

### CSS Animations & Transitions (default — use first)
Best for: Simple hover states, single-property transitions, entrance animations, micro-interactions.

```css
/* Always use tokens for timing */
.btn {
  transition: background-color var(--transition-fast),
              transform var(--transition-fast),
              box-shadow var(--transition-normal);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

### Intersection Observer API (scroll reveals — no library needed)
Best for: Fade-in, slide-up on scroll — without any JS library.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

```css
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### GSAP (GreenSock) — for complex sequences
Best for: Timeline-based sequences, scroll-triggered animations, complex stagger effects, morphing, DrawSVG.
CDN: `https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js`
ScrollTrigger: `https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js`

```js
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js';
import ScrollTrigger from 'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js';
gsap.registerPlugin(ScrollTrigger);

// Staggered hero text reveal
gsap.from('.hero__title span', {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.08,
  ease: 'power3.out'
});

// Scroll-triggered section reveal
gsap.from('.section', {
  scrollTrigger: { trigger: '.section', start: 'top 85%' },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out'
});
```

---

## Implementation Steps

1. **Define the animation** from `$ARGUMENTS` — what element, what motion, what trigger?
2. **Choose the right tool** (CSS → IntersectionObserver → GSAP, in order of preference)
3. **Write the animation** following the motion philosophy above
4. **Add `prefers-reduced-motion` guard:**

```css
@media (prefers-reduced-motion: reduce) {
  [data-animate], .animated-element {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

```js
// In JS
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  // run animation
}
```

5. **Test on mobile** — animations should be equally smooth on a mid-range phone
6. **Performance check** — only animate `transform` and `opacity` (GPU composited). Never animate `width`, `height`, `top`, `left`, or `margin`.

---

## Animation Token Reference

```css
/* From tokens.css */
--transition-fast:   150ms ease;     /* hover states, micro-interactions */
--transition-normal: 250ms ease;     /* standard UI transitions */
--transition-slow:   400ms ease;     /* reveals, complex transitions */
```

## Recommended Easing Values
- Entrance: `cubic-bezier(0.16, 1, 0.3, 1)` (ease out expo — fast in, gentle landing)
- Exit: `cubic-bezier(0.4, 0, 1, 1)` (ease in — gentle out, fast finish)
- Bounce/spring: `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot — premium feel)
