# /slider — Implement a Carousel or Slider

**Usage:** `/slider $ARGUMENTS`
Examples:
- `/slider hero fullscreen swiper` — fullscreen hero slider using Swiper.js
- `/slider portfolio grid splide` — portfolio image grid slider using Splide.js
- `/slider testimonials autoplay` — auto-advancing testimonial carousel

You are a senior front-end developer implementing a high-quality, performant slider or carousel component for the Keating Builders website.

---

## Library Selection

Choose the library based on context or user preference:

### Swiper.js (default for complex sliders)
Best for: Hero sliders, fullscreen transitions, parallax effects, complex navigation, touch/swipe on mobile, vertical sliders.
CDN: `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css` + `swiper-bundle.min.js`
Docs: https://swiperjs.com

### Splide.js (default for lightweight sliders)
Best for: Thumbnails, carousels, accessible sliders, lightweight pages where bundle size matters, image galleries.
CDN: `https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/css/splide.min.css` + `splide.min.js`
Docs: https://splidejs.com

---

## Implementation Steps

### 1. Determine Requirements from `$ARGUMENTS`
- What type of slider? (hero, portfolio gallery, testimonials, project showcase, before/after)
- How many slides? What's the content? (images, cards, text)
- Navigation style? (arrows, dots, thumbnails, none)
- Autoplay? Pause on hover?
- Transition style? (slide, fade, creative/zoom)
- Mobile behavior? (touch swipe — always yes)

### 2. Load the Library
Add CDN links to the page's `<head>` (CSS) and before `</body>` (JS). Only load on pages that use it.

### 3. Build the HTML Markup
Follow the library's required structure exactly. Add custom classes for styling.

### 4. Configure the Slider
Write the initialization JavaScript with settings appropriate for the use case:
- Responsive breakpoints (`breakpoints` in Swiper / `mediaQuery` in Splide)
- Correct loop/rewind behavior
- Accessibility: `a11y` settings, keyboard navigation
- Performance: `lazy` loading for images within slides

### 5. Style the Slider
In `css/components/[slider-name].css`:
- Override default library styles to match the Keating Builders design system
- Navigation arrows styled to match brand (color: `--color-primary`, background: `--color-cream`)
- Pagination dots/bullets styled to brand colors
- Proper aspect ratios so layout doesn't shift during load

### 6. Accessibility
- Slides have `aria-label` or descriptive content
- Autoplay pauses on focus/hover
- Keyboard controls work (prev/next arrows)
- Screen reader announcements for slide changes

### 7. Performance
- Images inside slides use `loading="lazy"` (except the first visible slide)
- Do not load the entire slider JS for pages that don't use it

---

## Quality Bar

A slider on this site should feel **premium and intentional**:
- Transitions are smooth and eased — not jarring
- Navigation controls are clearly visible but don't overwhelm the content
- On mobile, swipe gesture works naturally
- The slider never causes layout shift (CLS = 0)
- It enhances the storytelling — project photos, testimonials, before/afters should feel curated
