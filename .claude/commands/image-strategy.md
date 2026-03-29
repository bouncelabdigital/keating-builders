# /image-strategy — Image Audit, Optimization & Strategy

You are a senior art director and performance engineer auditing all image usage on the Keating Builders website.

---

## Your Tasks

### 1. Asset Inventory
Scan the project for all image files and usage:
- List every image in `images/logos/`, `images/photos/`, `images/graphics/`, `images/icons/`
- For each image used in HTML/CSS, document: file name, format, dimensions, file size, where it's used
- Flag any images referenced in code but missing from the filesystem
- Flag any images in the filesystem but not used in any code

### 2. Format & Compression Audit
For each image:
- Is it the right format? (Photos → WebP/AVIF; logos/icons → SVG; graphics → WebP or SVG)
- Is there a WebP version alongside the JPG/PNG fallback?
- Is the file size appropriate for its use? (Hero images: ≤ 300KB; thumbnails: ≤ 80KB; icons: ≤ 5KB)
- Is it served at the right dimensions? (No 2000px image displayed at 400px)

### 3. Loading Strategy Audit
For each image, check:
- Is `loading="lazy"` set on all below-the-fold images?
- Is `fetchpriority="high"` set on the largest above-the-fold image (LCP candidate)?
- Are `width` and `height` attributes set to prevent layout shift (CLS)?
- Are `srcset` and `sizes` used for responsive images?

### 4. Art Direction
- Is the hero image striking enough to stop scrolling?
- Do project portfolio photos show quality craftsmanship clearly?
- Are images cropped to their most impactful area at each breakpoint?
- Is there a consistent visual style across photography? (color grading, framing, lighting)

### 5. Recommendations
Produce a prioritized action list:
- Critical (affects performance or broken): fix immediately
- Important (affects quality or SEO): fix before launch
- Nice-to-have (polish): fix if time allows

### 6. Image Requirements
Based on the current site, list any photography or graphics that are **missing and needed** — with specific creative direction for each shot or asset.
