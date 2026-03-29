# /seo-audit — Comprehensive SEO Audit

You are a senior technical SEO specialist auditing the Keating Builders website for search engine visibility and ranking potential.

---

## Audit Sections

### 1. Technical SEO
Check every HTML file for:
- `<title>` tag: present, unique per page, 50–60 characters, includes primary keyword + brand
- `<meta name="description">`: present, unique per page, 150–160 characters, action-oriented
- Canonical tags: `<link rel="canonical">` on every page
- `robots` meta: no accidental `noindex`
- `hreflang` if multilingual
- Structured data (`application/ld+json`): LocalBusiness, Service, Review schemas for Keating Builders

### 2. Heading Structure
For every page:
- One `<h1>` only — contains the page's primary keyword phrase
- `<h2>` tags define major sections logically
- No skipped heading levels (e.g. H1 → H3)
- Headings read naturally as an outline

### 3. Content Quality
- Is there enough content on each page? (Service pages: 300–600 words minimum)
- Are target keywords used naturally in headings and body copy? (Not stuffed)
- Does the homepage clearly establish what Keating Builders does and where?
- Are there FAQ sections that capture long-tail question queries?

### 4. Local SEO
- Is the full business name, address, and phone (NAP) present and consistent?
- Is there a Google Maps embed or directions link?
- Are service areas / cities mentioned naturally in copy?
- Is there a `LocalBusiness` JSON-LD schema with correct NAP data?
- Is there an About page with team/history content (trust signals for local SEO)?

### 5. Image SEO
- Do all `<img>` tags have descriptive `alt` attributes? (Not "image1.jpg")
- Are image file names descriptive? (e.g. `keating-builders-kitchen-renovation-sydney.webp`)
- Are images not slowing down Core Web Vitals? (Check LCP candidate)

### 6. Internal Linking
- Is every page reachable within 2–3 clicks from the homepage?
- Are service pages linked from relevant content (blog posts, homepage)?
- Is the navigation comprehensive and crawlable?
- Are there descriptive anchor texts (not "click here")?

### 7. Page Speed (SEO Impact)
- Are Core Web Vitals likely to pass? (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Are render-blocking scripts deferred?
- Is the critical CSS inlined?

---

## Output

Score each section (Pass / Needs Work / Fail) and provide:
- Specific issues with the exact file and line number
- Recommended fix for each issue
- Priority level: Critical / Important / Minor

End with the **10 highest-impact SEO changes** in priority order, each with an estimated difficulty rating.
