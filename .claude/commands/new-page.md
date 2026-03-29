# /new-page — Scaffold a New Page

**Usage:** `/new-page $ARGUMENTS`
Example: `/new-page about` or `/new-page services/roofing`

You are a senior front-end developer building a page for the Keating Builders website. Scaffold a complete, production-quality HTML page following the project's design system defined in `.claude/CLAUDE.md`.

---

## Steps

1. **Identify the page** from `$ARGUMENTS`. If not provided, ask what page to create.

2. **Check the project** for:
   - Existing pages to understand the structural pattern in use
   - `css/tokens.css` for the current design tokens
   - `css/global.css` for base styles
   - Any shared components (nav, footer, etc.) already built

3. **Determine the page's content sections** based on its purpose:
   - What is the primary goal of this page?
   - What sections are needed? (hero, content blocks, CTA, etc.)
   - What components will be reused vs. new?

4. **Build the page** with:
   - Semantic HTML5 structure (`<main>`, `<section>`, `<article>`, etc.)
   - All classes following BEM convention
   - All colors, spacing, and type from CSS custom properties in `tokens.css`
   - A `<link>` to the page's own stylesheet in `css/components/[page-name].css`
   - Proper `<meta>` tags: title, description, Open Graph
   - Correct heading hierarchy (one `<h1>` per page)
   - Keyboard-navigable interactive elements
   - `alt` text on all images

5. **Create the page stylesheet** at `css/components/[page-name].css`:
   - Mobile-first CSS
   - No hardcoded values — use tokens only
   - Clearly commented sections

6. **After building**, automatically run `/screenshot` to capture the page at all four breakpoints and show the results.

---

## Quality Bar

- The page should look like it was designed by a senior designer, not assembled from defaults
- Generous whitespace, clear hierarchy, purposeful use of the brand palette
- Every section should have a clear purpose — no filler
- CTAs should be prominent and unambiguous
