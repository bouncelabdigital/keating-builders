/* Keating Builders: mobile nav + footer year (vanilla, no dependencies) */
'use strict';

(function initMobileNav() {
  const toggle = document.querySelector('.site-header__toggle');
  const panel  = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  const DURATION = 300; // must match .mobile-nav transition duration
  let hideTimer = null;

  // Fully out of the render tree while closed (iOS Safari translucent-chrome rule)
  panel.style.display = 'none';

  const open = () => {
    clearTimeout(hideTimer);
    panel.style.display = 'flex';
    void panel.offsetHeight; // force reflow so the transition runs
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  };

  const close = (immediate) => {
    clearTimeout(hideTimer);
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
    if (immediate) {
      panel.style.display = 'none';
    } else {
      hideTimer = setTimeout(() => { panel.style.display = 'none'; }, DURATION);
    }
  };

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });

  // Inline display outranks the desktop media query, so force-close past the breakpoint
  const desktop = window.matchMedia('(min-width: 960px)');
  desktop.addEventListener('change', (e) => { if (e.matches) close(true); });
})();

(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
