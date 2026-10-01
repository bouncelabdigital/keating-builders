/* Keating Builders: mobile nav + footer year (vanilla, no dependencies) */
'use strict';

(function initMobileNav() {
  const toggle = document.querySelector('.site-header__toggle');
  const panel  = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  const DURATION = 500; // must match .mobile-nav clip-path transition
  const body = document.body;
  const behind = document.querySelectorAll('main, footer');
  let hideTimer = null;

  // Fully out of the render tree while closed (iOS Safari translucent-chrome rule)
  panel.style.display = 'none';

  const setInert = (on) => behind.forEach((el) => { el.inert = on; });

  const open = (fromKeyboard) => {
    clearTimeout(hideTimer);
    body.classList.add('nav-lock', 'nav-open');
    panel.style.display = 'block';
    void panel.offsetHeight; // force reflow so the transition runs
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    setInert(true);
    // Move focus into the menu for keyboard users only (avoids a stray focus ring after a tap)
    const first = panel.querySelector('a');
    if (fromKeyboard && first) first.focus({ preventScroll: true });
  };

  const close = (immediate) => {
    clearTimeout(hideTimer);
    panel.classList.remove('is-open');
    body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    setInert(false);
    const finish = () => {
      panel.style.display = 'none';
      body.classList.remove('nav-lock');
    };
    if (immediate) finish();
    else hideTimer = setTimeout(finish, DURATION);
  };

  toggle.addEventListener('click', (e) => {
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open(e.detail === 0);
  });

  // In-page links (e.g. /#approach on the homepage) need the lock released before scrolling
  panel.addEventListener('click', (e) => {
    if (e.target.closest('a')) close(true);
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
