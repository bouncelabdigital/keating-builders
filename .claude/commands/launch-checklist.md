# /launch-checklist — Pre-Launch QA Checklist

You are a senior QA engineer running a comprehensive pre-launch quality assurance sweep of the Keating Builders website.

Run every item in this checklist. For each item, report: PASS / FAIL / N/A. For every FAIL, provide the exact issue and fix.

Do not mark the site as launch-ready until all Critical items PASS.

---

## CRITICAL — Must Pass Before Launch

### Code Quality
- [ ] No console errors on any page
- [ ] No broken image paths (all `src` attributes resolve)
- [ ] No broken links (all `href` attributes resolve; no 404s)
- [ ] No placeholder text (lorem ipsum, "TBD", "PLACEHOLDER", "[INSERT X]")
- [ ] No commented-out debug code left in production files
- [ ] HTML validates without errors (W3C validator equivalent)
- [ ] CSS has no parse errors

### Functionality
- [ ] All contact forms submit correctly and send email to the right address
- [ ] Form validation works (required fields, email format, phone format)
- [ ] Form success/error states are visible to the user
- [ ] All phone numbers are correctly formatted and clickable (`tel:` links)
- [ ] All email addresses are correctly formatted and clickable (`mailto:` links)
- [ ] Navigation works correctly on all pages (no broken nav links)
- [ ] Mobile menu opens and closes correctly
- [ ] All CTA buttons link to the correct destination

### SEO & Meta
- [ ] Every page has a unique `<title>` tag (50–60 chars)
- [ ] Every page has a unique `<meta name="description">` (150–160 chars)
- [ ] Every page has `<link rel="canonical">`
- [ ] `<html lang="en">` is set
- [ ] Favicon is present and correct in all sizes
- [ ] Open Graph tags present on key pages (og:title, og:description, og:image)
- [ ] Robots.txt exists and is correctly configured
- [ ] Sitemap.xml exists and lists all pages

### Accessibility
- [ ] All images have `alt` text (or `alt=""` if decorative)
- [ ] Skip navigation link present
- [ ] All pages keyboard-navigable
- [ ] Color contrast passes WCAG 2.1 AA on all text
- [ ] All forms have proper `<label>` elements

### Performance
- [ ] LCP image is preloaded
- [ ] All images have `width` and `height` attributes
- [ ] Below-fold images have `loading="lazy"`
- [ ] No render-blocking scripts in `<head>` without `defer`/`async`
- [ ] Total page weight is reasonable (homepage < 2MB uncompressed)

### Responsive
- [ ] Site renders correctly at 375px (no horizontal overflow)
- [ ] Site renders correctly at 768px
- [ ] Site renders correctly at 1280px
- [ ] Site renders correctly at 1920px
- [ ] Touch targets are ≥ 44px on mobile

---

## IMPORTANT — Fix Before Client Handoff

### Content
- [ ] Client name, address, phone, and email are correct throughout
- [ ] All services listed accurately reflect current offerings
- [ ] Portfolio/project photos are correctly captioned
- [ ] Team bios are accurate and approved by client
- [ ] Testimonials are approved by client
- [ ] Copyright year is current

### Analytics & Tracking
- [ ] Google Analytics (or equivalent) is installed and firing correctly
- [ ] Goal/conversion tracking is set up for form submissions and calls
- [ ] Google Search Console is configured and site is submitted

### Legal
- [ ] Privacy Policy page exists and is up to date
- [ ] Terms of Service / Terms of Use if applicable
- [ ] Cookie consent banner if required (GDPR/CCPA)

---

## FINAL STEP

After all Critical items pass:
1. Run `/screenshot` to capture the final pre-launch state at all breakpoints
2. Generate a launch summary noting any known issues deferred to post-launch
