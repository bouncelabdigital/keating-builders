# Keating Builders — Website Project

## Project Overview
**Client:** Keating Builders
**Type:** Construction & Building Company
**Agency:** Web Design & Development
**Goal:** A premium, conversion-focused website that communicates craftsmanship, trust, and professionalism to homeowners and commercial clients.

---

## Design Philosophy

We build websites that are **exceptionally well designed** — not just functional. Every pixel matters.

### Core Principles
1. **Whitespace is a feature.** Give elements room to breathe. Cramped layouts signal poor quality.
2. **Typography sets the tone.** Use a deliberate type scale. Hierarchy guides the eye; don't fight it.
3. **Performance is design.** A slow site is a bad design. Optimize everything.
4. **Accessibility is non-negotiable.** WCAG 2.1 AA minimum on every page, every component.
5. **Mobile-first, but desktop-elevated.** Design for small screens first, then enhance for larger ones.
6. **Consistency builds trust.** Spacing, color, type, and motion should feel cohesive across every page.

### Visual Identity
- **Tone:** Premium, trustworthy, established — not corporate or sterile
- **Photography:** Real project photos preferred over stock imagery
- **Iconography:** Clean, minimal line icons — consistent stroke weight throughout

---

## Brand Color Palette

Source: https://coolors.co/a7a284-efede7-181711-103900

| Token Name | Hex | Role |
|---|---|---|
| `--color-primary` | `#103900` | Deep Forest Green — primary CTA, links, accents |
| `--color-primary-dark` | `#0a2400` | Darker green for hover states |
| `--color-primary-light` | `#1a5c00` | Lighter green for subtle highlights |
| `--color-dark` | `#181711` | Near-Black — body text, headings on light bg |
| `--color-stone` | `#a7a284` | Warm Stone/Khaki — secondary text, borders, dividers |
| `--color-stone-light` | `#c8c5ad` | Lighter stone for disabled states, placeholder text |
| `--color-cream` | `#efede7` | Off-White Cream — primary background |
| `--color-cream-dark` | `#e0ddd5` | Slightly darker cream for cards, sections |
| `--color-white` | `#ffffff` | True white — used sparingly for contrast moments |

### Color Usage Rules
- **Backgrounds:** Cream (`#efede7`) as default page bg; near-black (`#181711`) for dark hero/CTA sections
- **Text on light:** Near-black (`#181711`) for body; stone (`#a7a284`) for captions/meta
- **Text on dark:** Cream (`#efede7`) for body; stone (`#a7a284`) for secondary text
- **CTAs and interactive:** Forest green (`#103900`) for buttons/links on light bg; cream on dark bg
- **Never** use pure black (`#000`) or pure white (`#fff`) for large text blocks — use the palette

---

## Tech Stack

**Default stack for this project (update when confirmed):**
- Semantic HTML5
- CSS Custom Properties (design tokens)
- Vanilla JS or lightweight framework (no heavy dependencies without reason)
- No build tools unless project complexity warrants it

**Asset Pipeline:**
- Images: WebP with JPG fallback; lazy-load all below-the-fold images
- Fonts: Self-hosted via `@font-face`; preload critical fonts
- Icons: Inline SVG preferred over icon fonts

---

## Project Structure

```
/
├── index.html, about.html, projects.html, contact.html, privacy.html
├── services/                  ← new-homes, renovations, kitchens, baths, additions (.html)
├── css/site.css               ← ALL shared styles: tokens, reset, header, footer, buttons, components
├── js/site.js                 ← mobile nav + footer year (every page)
├── js/contact.js              ← contact form validation + Web3Forms submit (contact page only)
├── fonts/                     ← self-hosted Newsreader (roman/italic) + Inter woff2
├── images/{photos,graphics,logos}/  ← source rasters + AVIF variants
├── _headers, robots.txt, sitemap.xml, llms.txt
└── .claude/                   ← this file + agency skill prompts
```

## Design Tokens (CSS Custom Properties)
All tokens live at the top of `css/site.css` (`:root`). Reference tokens, never hardcode colors in component CSS. Key tokens: `--color-cream #efede7`, `--color-card #e9e6dd`, `--color-dark #181711`, `--color-ink-soft #46443a`, `--color-olive #3c4632`, `--color-olive-dark #2c3424`, `--color-olive-text #4b5139`, `--color-stone #a7a284`, `--color-rule #c8c5ad`, `--font-display` (Newsreader), `--font-sans` (Inter), `--gutter`, `--header-h`, `--ease`, `--grain-light`/`--grain-dark` (inline SVG noise for the paper texture).

## Code Standards

- **HTML:** Semantic elements only. No `<div>` where a `<section>`, `<article>`, `<nav>`, etc. belongs.
- **CSS:** BEM-style class naming. No inline styles. All values from tokens.
- **JS:** Vanilla ES6+ modules. No jQuery. Comment complex logic only.
- **Accessibility:** All images have descriptive `alt` text. Interactive elements keyboard-navigable. Color contrast ≥ 4.5:1 (body) / 3:1 (large text).
- **Comments:** Only where logic isn't self-evident.

---

## Screenshot Convention
At key milestones (after layout, after each page, before launch), run `/screenshot` to capture the site at:
- **375px** — Mobile (iPhone SE)
- **768px** — Tablet (iPad portrait)
- **1280px** — Desktop
- **1920px** — Wide / large monitor

Screenshots saved to `screenshots/` and reviewed before proceeding.

---

## Available Skills

### Workflow
| Command | When to Use |
|---|---|
| `/design-brief` | At project start — capture all client requirements |
| `/new-page $name` | Scaffold any new page (e.g. `/new-page about`) |
| `/new-component $name` | Build a new UI component (e.g. `/new-component hero`) |
| `/color-system` | Audit or expand the color palette and CSS tokens |
| `/typography-system` | Design type scale, font choices, and hierarchy |
| `/copy-review $page` | Elevate copy on a specific page |
| `/image-strategy` | Plan and audit all image usage across the site |

### Quality Audits
| Command | When to Use |
|---|---|
| `/design-audit` | Before any client review or presentation |
| `/seo-audit` | After all copy and pages are in place |
| `/accessibility-audit` | Before launch and after major changes |
| `/performance-audit` | After all assets are integrated |
| `/responsive-audit` | After each page build |

### Project Management
| Command | When to Use |
|---|---|
| `/screenshot` | After layout milestones and before reviews |
| `/site-map` | At project start and when adding pages |
| `/launch-checklist` | Final QA before going live |
| `/client-handoff` | After launch — generate client documentation |

---

## Current State: Scrapbook Redesign (2026-10-01)

Whole site rebuilt from the diffui "Homepage Design Cleanup" design (calm scrapbook look: paper grain, taped photo prints with kraft backing sheets, olive header + footer band).

- **Styles**: one shared external stylesheet `css/site.css` (deliberate deviation from the agency "inline CSS per page" default: 10 pages sharing ~450 lines is safer as one cached file than 10 hand-synced copies). Page-only rules go in that page's inline `<style>` (homepage hero/collage/cards; projects featured card).
- **Shared blocks (must stay identical on all 10 pages; grep-verify after any edit)**: `<head>` boilerplate + GeneralContractor JSON-LD, `.site-header` + `.mobile-nav` (only `aria-current="page"` differs), `.site-footer`.
- **Mobile menu**: framed MENU toggle (1px cream hairline frame matching the logo sign's inset frame, tracked MENU/CLOSE label from CSS `::before`, hand-drawn bars folding to an X; replaced the earlier cream paper-tab toggle, which clashed with the sign board and out-shouted the logo); full-screen olive panel; each primary link is a torn scrap of fibrous paper (gentle many-point clip-path tear, alternating tilt, no numbers or dividers; an optional lighter torn rim exists behind the `.mobile-nav--rim` class, off by default pending client preference), Services as five level kraft discs printed in olive "ink" (seal ring, icon and label use `mix-blend-mode: multiply` plus inline SVG filters `#ink` / `#ink-fine` for rough edges and speckle voids; the filter `<svg class="ink-defs">` sits just before the menu, outside the display:none panel, so references always resolve). Icons are clean 24px line drawings (house, hammer, faucet over sink, clawfoot tub, house + annex), each vertically centred in its grid, and the ink block is lifted 1.5px for optical centring. Discs are laid out 3 over 2, and a centred Inquire button + phone row (email lives in the footer/contact page). Panel height is `100dvh` so it sits above the mobile URL bar; a `max-height: 600px` compact mode keeps it fitting on an iPhone SE in Safari (375×553) without scrolling. Motion uses the site entrance language (`--ease`, 14px rise, .08s stagger, clip-path reveal, reduced-motion off). `js/site.js`: `display:none` when closed, reflow before open, 500ms timed hide, `nav-lock` keeps the header pinned until the close finishes, page behind is `inert`, focus moves in only for keyboard opens, force-close at 960px. All paths are root-relative (`/css/...`, `/about.html`).
- **Components** (all in site.css): `.btn` / `.btn--light` (grain face, offset kraft sheet, tape), `.btn--no-tape`, `.btn--seal` (replaces the tape with an inline-SVG ink seal, two rings plus a dotted ring roughened by the `#ink` filter, tucked behind both layers at z-index -2 and turning once per 30s, still for reduced motion; used on the header and mobile-menu Inquire buttons; SVG data URIs must encode `#` as `%23`). Untaped buttons: homepage "Explore our work" and "Our story" (`.btn--no-tape`), `.paper` + `.paper__sheet` (kraft backing, tilted sheet, tape; `--tilt` var; `.paper--left`, `.paper--flat`), `.print` (photo on paper), `.page-hero` (+`--text`), `.crumbs`, `.display`, `.eyebrow`, `.section` / `.section--rule` / `.section__head`, `.split`, `.note`, `.checklist`, `.steps`, `.principles` (+`--3`), `.facts`, `.gallery` (+`--feature`), `.cta`, form `.field`/`.info`, `.prose`.
- **H1 pattern**: every H1 = small keyword label (`.label.eyebrow`, e.g. "Kitchen Remodeling in Berkshire County, MA") + large display line. Homepage display = slogan "Building the Future, Rebuilding the Past." Privacy H1 has no label (agency rule). The location part of each label is wrapped in `.eyebrow__place`, which drops to its own line below 640px (text unchanged for SEO). Decided against a marquee for this label (readability + WCAG 2.2.2 pause requirement).
- **Fibrous paper texture**: `images/graphics/fibrous-paper.{avif,jpg}` is a seamless 512px tile synthesized from the torn paper in the hero collage (shown at 256px). Used by the mobile menu scraps and the hero "Same land. New possibilities." note; base tone `--color-scrap #e9e5da`.
- **Footer band**: "Keating Builders / Berkshire County, MA / Licensed & Insured", the "Let's build together" button, then the light logo after a divider (replaced decorative coordinates).
- **Logo system (2026-10-21, new mountain logo)**: vector SVGs in `images/logos/`, rebuilt from a Gemini-flattened version of an AI letterpress mockup. The wordmark is real **Montserrat Bold** outlines (OFL; measured to match the design's letters within ~1-2%), except Gemini's two custom letters rebuilt as exact geometry: the split **A** (crossbar detached from the left leg by a diagonal gap, heavier legs) and the **G** with a longer, higher crossbar; plus an **R** whose bowl stays open and flows into the leg without rejoining the stem (from `images/logos/r-and-k-reference-image.jpeg`), and an **N** with hairline slits continuing the diagonal's edges 50 units into each stem (detail from `images/logos/n-reference-image.jpeg`, which uses a different typeface; only the slit detail was taken). A, R and N share this cut detail; K stays stock Montserrat on purpose: a cut first letter risks the word reading as "EATING" (2026-10-21). The tagline is also Montserrat Bold, placed per letter. The mountain is a hand-drawn brush stroke, refitted with curvature-weighted smoothing splines (sharp only at its 5 true points) so it stays smooth at any size. Earlier pixel-traced lettering was replaced because curved letters (B, U, D, R, S, G) wobbled when enlarged. Files: `keating-builders-logo-{flat,embossed}.svg` (light backgrounds), `-light-{flat,embossed}.svg` (dark backgrounds), `-compact-{flat,embossed}.svg` and `-compact-light-{flat,embossed}.svg` (no tagline, for small spaces). All 8 files share byte-identical artwork paths; only colours/filter differ. Flat = solid colours (cut vinyl, embroidery, under ~200px); embossed = letterpress deboss built as an inline SVG filter tuned to the original mockup (screens and full-colour print; many sign-shop RIPs drop SVG filters, so export a raster at job size for print). Colours: flat `#444540`/`#336147`, embossed face `#4d4e48`/`#4f7059`, light `#efede7`/sage `#a8c3a0`. Header + footer band use `keating-builders-logo-compact-light-flat.svg` (plain `<img>`, no `<picture>`). The embossed version was used there first but looked blurry/faded on iPhone: iOS Safari rasterises SVG filters inside an `<img>` at 1x and upscales, and the emboss's greyer face lowers contrast. Rule: no SVG-filter logos at small sizes on the site; embossed files are for large display and print. Tagline still has an em dash (differs from the site slogan's comma), pending client call. Schema `"logo"` still points to the old `keating-builders-logo.png` (should become a raster of the new logo). Old logo files now unused by pages: `keating-builders-logo-light.png`, `keating-builders-logo-light-325w.avif`, and the photo-in-SVG `keating-builders-logo.svg` + Gemini JPEG source (untracked).
- **Homepage preloader (2026-10-21)**: tan drafting paper (`--color-tan #e8dfcc` + grain) with a faint green floor-plan tile (`images/graphics/blueprint-plan.svg`, radial-masked behind the logo). The embossed logo is inlined as SVG so it can animate: mountain + wordmark outlines draw in via stroke-dashoffset (hidden state set by an inline script right after the markup, before paint), fill is then **painted on** (1.15–2.5s): JS clones the mountain + wordmark under an SVG mask of six horizontal brush passes (alternating direction like rolling paint on siding; bristly edges from an feTurbulence/feDisplacementMap filter on the mask), originals stay outline-only (`#preloader.is-painting .pl-draw { fill-opacity: 0 }`); outlines dissolve and the tagline appears at 2.3s, hand-off at 3.0s (`fill-opacity`, not `opacity`: opacity on that filtered path failed to show). Hand-off at >=2.7s: the sheet lifts away (`translateY(-100%)`, .95s, paper shadow + green edge rule), logo drifts up and fades, hero entrance starts 300ms into the lift (`html.preloading .rise/.fade { animation: none }`, not paused: pausing proved unreliable), then the overlay returns to `display:none`. Shows on every homepage load. Reduced motion: static logo + short fade. All inline in `index.html`. Headless Chrome needs `--run-all-compositor-stages-before-draw` or animations look stuck in captures.
- **Mobile nav**: `.nav-lock` also adds `padding-top: var(--header-h)` so the pinned header's space is held (fixed a content jump on close).
- **Mobile header = "hanging shingle" (below 960px)**: 56px bar; the logo sits on an olive sign board (grain, inset hairline frame, soft shadow) hanging 26px below it (`--shingle-drop`); `main` and the mobile-nav padding add that drop. The header's full-bleed box-shadow/clip-path trick is switched off below 960px (it would clip the sign). Desktop header unchanged. **Header is sticky** (`position: sticky; top: 0`, all widths); `js/site.js` toggles `html.is-scrolled` past 24px (rAF-throttled passive scroll listener), and below 960px that tucks the sign into the bar (`translateY(3px) scale(.62)`, transform only) and adds a soft bar shadow. `html { scroll-padding-top }` keeps in-page anchors clear of the header.
- **Domain / hosting / email (2026-10-21)**: domain registered at ZenBusiness; DNS moved to **Cloudflare** (nameservers `anirban` / `frida.ns.cloudflare.com`, zone Active, no DNSSEC). Old ZenBusiness website A/CNAME records deleted, so the domain currently serves nothing (site not deployed yet). **Google Workspace** live for `@keatingbuilders.com`: MX `smtp.google.com` (prio 1), SPF `v=spf1 include:_spf.google.com ~all`, DKIM at `google._domainkey`, DMARC `v=DMARC1; p=none` (tighten to quarantine later), plus the `google-site-verification` TXT (keep). Next: launch a temporary one-page landing page as its **own** Cloudflare Pages project (so WIP pushes here never go live), then swap the domain to this project at full launch. Pages will create the web records.
- **Next up**: banner print file for the client's project-site fencing (needs real phone + sign-shop specs), Google Business Profile (service-area, start early for verification), landing page, then finish the full site. Printable checklist: https://claude.ai/artifact/7i7ksG1tVNknT5gqSxAHAZ. Untracked on purpose (don't commit, would publish): Gemini source JPEG, `r-and-k-reference-image.jpeg`, `n-reference-image.jpeg`, old photo-in-SVG `keating-builders-logo.svg`; move them out of `images/logos/`.
- **Fonts ("Signage" direction, 2026-10-23, trial pending sign-off)**: headings = **Barlow Condensed** 600 caps (500/600/700 loaded), body + labels + UI = **Barlow** 400/400 italic/500/600; both OFL, latin subset woff2 from Google Fonts' origin (fonts.gstatic.com, Barlow **v13**, Barlow Condensed **v13**), self-hosted in `/fonts/barlow-*.woff2`. Tokens: `--font-display` = Barlow Condensed, `--font-sans` = Barlow (body now uses `--font-sans`). A final block in `site.css` (`html body :is(h1, h2, h3, .display, .h2, .hero__slogan, .facts strong)`) sets condensed 600 caps and outranks the per-page inline `font-weight: 400` heading rules; emphasis in headings is olive colour, not italic (no condensed italic loaded). Small headings (`.site-footer h2`, `.principles h3`, `.card__title`) stay full-width Barlow. Mobile menu links are condensed caps. Previous fonts (Newsreader + Inter) are still in `/fonts/` for an easy revert. **Vendoring checklist still to finish before commit**: cross-check hashes against a second source, VirusTotal lookup. Chosen over Fraunces+Montserrat ("Crafted") and Archivo ("Architectural") mockups.
- **Palette deviation**: muted olive `#3c4632` replaces `#103900` for buttons/header/footer, per the diffui design.
- **Images**: diffui-generated homepage assets + the client's existing project photos, all with AVIF variants (quality 50) in `<picture>`. `olive-branch-on-paper*` (hero print, no tape) was cropped from the original materials photo. The Materials card now uses `limestone-walnut-concrete-building-materials*`: the olive was painted out and replaced with a concrete slab cut from the hero collage, so the plant isn't repeated next to the hero print. Old unused files kept: `hero-bg.jpg`, `berkshire-hero-a.jpg`, `treeline.png`, `favicon-512.png`.
- **AVIF gotcha found here**: `sips` output at some odd pixel heights (e.g. 1200x799, 800x1199) produced files Chrome refused to decode (broken image, no error). Fixed by regenerating at even heights with `sips -z <even-h> <w>`. Test new AVIFs by opening them directly in Chrome.
- **Contact form**: Web3Forms wiring done in `js/contact.js` (JSON POST, checks `data.success`, botcheck, required name/phone/service). **Launch blocker**: `access_key` is still the placeholder `YOUR_WEB3FORMS_ACCESS_KEY` in `contact.html`.
- **Removed**: old tokens/global/component CSS, `js/main.js`, `js/nav-effect.js`, house preloader, stat counters, testimonial slider, Google Fonts CDN.
- **CSP** (`_headers`): self-only plus Cloudflare Insights and `api.web3forms.com` (connect-src + form-action).
- **Claims/data to verify with client before launch**: placeholder phone `(413) 555-0100`; no street address/geo in schema; "30+ years", "Since 1993", "500+ projects", and the per-service stats ("A+", "1890s", "100%"); the unattributed testimonial quotes on service pages; that the project photos are actually Keating's work (they look like stock).
