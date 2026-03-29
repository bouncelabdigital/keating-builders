/* ============================================================
   KEATING BUILDERS — MAIN JS
   - Nav: scroll-aware, mobile drawer toggle
   - Scroll Reveal: IntersectionObserver for [data-animate]
   - Stat Counters: count-up animation on scroll into view
   - Footer year: dynamic copyright year
   ============================================================ */

'use strict';

/* ─── Utility: check reduced motion preference ─── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ─── NAV: Scroll-aware solid/transparent ─── */
(function initNav() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('nav-hamburger');
  const drawer     = document.getElementById('nav-drawer');

  if (!nav) return;

  /* Scroll: add .is-scrolled when past the viewport fold */
  let scrollbarIdleTimer = null;
  const SCROLLBAR_IDLE_MS = 1500; // hide scrollbar after 1.5s idle

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    /* Scrollbar: show on scroll, hide after idle */
    if (window.scrollY > 0) {
      document.documentElement.classList.add('is-scrolled-page');
      clearTimeout(scrollbarIdleTimer);
      scrollbarIdleTimer = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolled-page');
      }, SCROLLBAR_IDLE_MS);
    } else {
      clearTimeout(scrollbarIdleTimer);
      document.documentElement.classList.remove('is-scrolled-page');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* Mobile drawer toggle */
  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    hamburger.classList.add('is-open');
    drawer.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    nav.classList.add('is-scrolled');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    hamburger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    /* Also collapse the services sub-menu */
    const sub = drawer.querySelector('.nav__drawer-sub');
    const toggle = drawer.querySelector('.nav__drawer-services-toggle');
    if (sub && toggle) {
      sub.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  };

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    isOpen ? closeDrawer() : openDrawer();
  });

  /* Mobile services accordion */
  const servicesToggle = drawer.querySelector('.nav__drawer-services-toggle');
  const servicesSub    = drawer.querySelector('.nav__drawer-sub');
  if (servicesToggle && servicesSub) {
    servicesToggle.addEventListener('click', () => {
      const isOpen = servicesSub.classList.contains('is-open');
      servicesSub.classList.toggle('is-open', !isOpen);
      servicesToggle.setAttribute('aria-expanded', String(!isOpen));
      servicesSub.setAttribute('aria-hidden', String(isOpen));
    });
  }

  /* Close drawer when any navigable link is clicked */
  drawer.querySelectorAll('.nav__drawer-link, .nav__drawer-sublink, .btn').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* Close drawer on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
      hamburger.focus();
    }
  });

  /* ─── Desktop dropdown: hover open, 200ms grace period to reach panel ─── */
  document.querySelectorAll('.nav__dropdown-wrap').forEach(wrap => {
    const trigger = wrap.querySelector('.nav__dropdown-trigger');
    if (!trigger) return;

    let closeTimer = null;

    const openWrap = () => {
      clearTimeout(closeTimer);
      document.querySelectorAll('.nav__dropdown-wrap.is-open').forEach(w => {
        if (w !== wrap) {
          w.classList.remove('is-open');
          const t = w.querySelector('.nav__dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };

    const scheduleClose = () => {
      closeTimer = setTimeout(() => {
        wrap.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, 200);
    };

    wrap.addEventListener('mouseenter', openWrap);
    wrap.addEventListener('mouseleave', scheduleClose);

    /* Click also works (keyboard / touch fallback) */
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      clearTimeout(closeTimer);
      const isOpen = wrap.classList.contains('is-open');
      if (isOpen) {
        wrap.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        openWrap();
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav__dropdown-wrap.is-open').forEach(w => {
      w.classList.remove('is-open');
      const t = w.querySelector('.nav__dropdown-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav__dropdown-wrap.is-open').forEach(w => {
        w.classList.remove('is-open');
        const t = w.querySelector('.nav__dropdown-trigger');
        if (t) { t.setAttribute('aria-expanded', 'false'); t.focus(); }
      });
    }
  });

  /* Mark active nav link based on current page */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === '/')) {
      link.classList.add('is-active');
    }
  });
})();


/* ─── SCROLL REVEAL ─── */
(function initScrollReveal() {
  if (prefersReducedMotion) {
    /* Show everything immediately for reduced-motion users */
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* ─── STAT COUNTERS ─── */
(function initCounters() {
  const counters = document.querySelectorAll('.js-counter');
  if (!counters.length) return;

  if (prefersReducedMotion) {
    counters.forEach(el => {
      el.textContent = el.dataset.target;
    });
    return;
  }

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1600; // ms
    const start    = performance.now();

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = Math.round(eased * target);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* ─── PRELOADER ─── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const hero      = document.getElementById('hero');
  if (!preloader) return;

  // Total preloader duration: 3.55s fade-out start + 0.7s fade = 4.25s
  // Add class to body at 3.6s → hero entrance animations fire
  const HERO_START  = 3600;  // ms — when hero content animates in
  const REMOVE_TIME = 4300;  // ms — when we remove preloader from DOM

  // Kick off Ken Burns on hero bg
  if (hero) {
    setTimeout(() => hero.classList.add('is-loaded'), HERO_START);
  }

  // Trigger hero entrance
  setTimeout(() => {
    document.body.classList.add('preloader-done');
  }, HERO_START);

  // Remove preloader from DOM entirely (no longer needed)
  setTimeout(() => {
    preloader.remove();
  }, REMOVE_TIME);
})();


/* ─── DYNAMIC COPYRIGHT YEAR ─── */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ─── TESTIMONIALS SLIDER — card stack ─── */
(function initTestimonialsSlider() {
  const slider  = document.querySelector('.testimonials__slider');
  if (!slider) return;

  const track   = slider.querySelector('.testimonials__track');
  const cards   = Array.from(track.querySelectorAll('.testimonial-card'));
  const dots    = Array.from(slider.querySelectorAll('.testimonials__dot'));
  const btnPrev = slider.querySelector('.testimonials__arrow--prev');
  const btnNext = slider.querySelector('.testimonials__arrow--next');
  const total   = cards.length;
  let current   = 0;
  let locked    = false;
  let autoTimer = null;

  const TRANSITION_MS = 600;
  const STATE_CLASSES  = ['is-active','is-stack-1','is-stack-2','is-hidden','is-exit-left','is-exit-right'];

  /* ── Height: measure tallest card, fix track so nothing reflows ── */
  function syncHeight() {
    track.style.height = '';
    cards.forEach(c => { c.style.minHeight = ''; });
    // Briefly make all visible at natural size
    cards.forEach(c => {
      c.classList.remove(...STATE_CLASSES);
      c.style.opacity     = '0';
      c.style.position    = 'absolute';
      c.style.transform   = 'none';
      c.style.visibility  = 'hidden';
      c.style.transition  = 'none';
    });
    // Force layout
    track.style.height = 'auto';
    const maxH = Math.max(...cards.map(c => c.offsetHeight));
    // Fix every card + the track to that height
    cards.forEach(c => {
      c.style.minHeight  = maxH + 'px';
      c.style.opacity    = '';
      c.style.position   = '';
      c.style.transform  = '';
      c.style.visibility = '';
      c.style.transition = '';
    });
    track.style.height = (maxH + 32) + 'px'; // +32 for stack peek space
  }

  /* ── Assign stack classes without touching the exiting card ── */
  function assignStates(activeIdx, skipIdx) {
    cards.forEach((card, i) => {
      if (i === skipIdx) return;
      card.classList.remove(...STATE_CLASSES);
      const rel = ((i - activeIdx) % total + total) % total;
      if      (rel === 0) card.classList.add('is-active');
      else if (rel === 1) card.classList.add('is-stack-1');
      else if (rel === 2) card.classList.add('is-stack-2');
      else                card.classList.add('is-hidden');
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === activeIdx));
  }

  /* ── Transition ── */
  function goTo(nextIdx, dir) {
    if (locked) return;
    nextIdx = ((nextIdx % total) + total) % total;
    if (nextIdx === current) return;
    locked = true;

    const departingIdx  = current;
    const departingCard = cards[departingIdx];
    const exitClass     = dir === 'next' ? 'is-exit-left' : 'is-exit-right';

    current = nextIdx;

    // 1. Exit departing card
    departingCard.classList.remove(...STATE_CLASSES);
    departingCard.classList.add(exitClass);

    // 2. Move all other cards to new positions
    assignStates(current, departingIdx);

    // 3. After animation: put departing card into its new stack position silently
    setTimeout(() => {
      departingCard.style.transition = 'none';
      departingCard.classList.remove(exitClass);
      const rel = ((departingIdx - current) % total + total) % total;
      if      (rel === 1) departingCard.classList.add('is-stack-1');
      else if (rel === 2) departingCard.classList.add('is-stack-2');
      else                departingCard.classList.add('is-hidden');
      // Re-enable transitions on next frame
      requestAnimationFrame(() => {
        departingCard.style.transition = '';
        locked = false;
      });
    }, TRANSITION_MS);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1, 'next'), 5500);
  }
  function stopAuto() { clearInterval(autoTimer); }

  /* ── Init ── */
  syncHeight();
  assignStates(0, -1);
  window.addEventListener('resize', () => { syncHeight(); assignStates(current, -1); });

  /* ── Controls ── */
  btnPrev?.addEventListener('click', () => { stopAuto(); goTo(current - 1, 'prev'); startAuto(); });
  btnNext?.addEventListener('click', () => { stopAuto(); goTo(current + 1, 'next'); startAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    stopAuto();
    goTo(i, i > current ? 'next' : 'prev');
    startAuto();
  }));

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', () => { if (!prefersReducedMotion) startAuto(); });

  /* ── Touch drag — card follows finger ── */
  let touchStartX = 0;
  let dragX       = 0;
  let dragging    = false;

  track.addEventListener('touchstart', e => {
    if (locked) return;
    stopAuto();
    touchStartX = e.touches[0].clientX;
    dragX       = 0;
    dragging    = true;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (!dragging) return;
    dragX = e.touches[0].clientX - touchStartX;
    const activeCard = cards[current];
    activeCard.style.transition = 'none';
    activeCard.style.transform  = `translateX(${dragX}px) scale(1) rotate(${dragX * 0.02}deg)`;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    const activeCard = cards[current];
    activeCard.style.transition = '';
    activeCard.style.transform  = '';

    if (Math.abs(dragX) > 60) {
      goTo(dragX < 0 ? current + 1 : current - 1, dragX < 0 ? 'next' : 'prev');
    }
    startAuto();
  }, { passive: true });

  if (!prefersReducedMotion) startAuto();
})();


/* ─── SMOOTH ANCHOR SCROLL (for in-page nav links) ─── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
})();
