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
- **Shared blocks (must stay identical on all 10 pages; grep-verify after any edit)**: `<head>` boilerplate + GeneralContractor JSON-LD, `.site-header` + `.mobile-nav` (only `aria-current="page"` differs), `.site-footer`. All paths are root-relative (`/css/...`, `/about.html`).
- **Components** (all in site.css): `.btn` / `.btn--light` (grain face, offset kraft sheet, tape), `.paper` + `.paper__sheet` (kraft backing, tilted sheet, tape; `--tilt` var; `.paper--left`, `.paper--flat`), `.print` (photo on paper), `.page-hero` (+`--text`), `.crumbs`, `.display`, `.eyebrow`, `.section` / `.section--rule` / `.section__head`, `.split`, `.note`, `.checklist`, `.steps`, `.principles` (+`--3`), `.facts`, `.gallery` (+`--feature`), `.cta`, form `.field`/`.info`, `.prose`.
- **H1 pattern**: every H1 = small keyword label (`.label.eyebrow`, e.g. "Kitchen Remodeling in Berkshire County, MA") + large display line. Homepage display = slogan "Building the Future, Rebuilding the Past." Privacy H1 has no label (agency rule).
- **Fonts**: Newsreader (roman + italic, variable) and Inter (variable), OFL, downloaded from Google Fonts' origin 2026-10-01, self-hosted in `/fonts/`.
- **Palette deviation**: muted olive `#3c4632` replaces `#103900` for buttons/header/footer, per the diffui design.
- **Images**: diffui-generated homepage assets + the client's existing project photos, all with AVIF variants (quality 50) in `<picture>`. `olive-branch-on-paper*` is a stand-in cropped from the materials photo; replace when diffui credit is available. Old unused files kept: `hero-bg.jpg`, `berkshire-hero-a.jpg`, `treeline.png`, `favicon-512.png`.
- **AVIF gotcha found here**: `sips` output at some odd pixel heights (e.g. 1200x799, 800x1199) produced files Chrome refused to decode (broken image, no error). Fixed by regenerating at even heights with `sips -z <even-h> <w>`. Test new AVIFs by opening them directly in Chrome.
- **Contact form**: Web3Forms wiring done in `js/contact.js` (JSON POST, checks `data.success`, botcheck, required name/phone/service). **Launch blocker**: `access_key` is still the placeholder `YOUR_WEB3FORMS_ACCESS_KEY` in `contact.html`.
- **Removed**: old tokens/global/component CSS, `js/main.js`, `js/nav-effect.js`, house preloader, stat counters, testimonial slider, Google Fonts CDN.
- **CSP** (`_headers`): self-only plus Cloudflare Insights and `api.web3forms.com` (connect-src + form-action).
- **Claims/data to verify with client before launch**: placeholder phone `(413) 555-0100`; no street address/geo in schema; "30+ years", "Since 1993", "500+ projects", and the per-service stats ("A+", "1890s", "100%"); the unattributed testimonial quotes on service pages; that the project photos are actually Keating's work (they look like stock).
