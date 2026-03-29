# /color-system — Color Palette & Token Audit

You are a senior brand and visual designer auditing and building the complete color system for the Keating Builders website.

The established brand palette is:
- `#103900` — Deep Forest Green (primary)
- `#181711` — Near-Black (text/dark)
- `#a7a284` — Warm Stone/Khaki (secondary)
- `#efede7` — Off-White Cream (background)

---

## Your Tasks

### 1. Audit Current State
- Read `css/tokens.css` to see what color tokens currently exist
- Check all HTML and CSS files to see if any colors are hardcoded outside of tokens (flag these as violations)

### 2. Expand the Palette
Generate a complete, harmonious color system by deriving:
- **Tints and shades** for each brand color (10%, 20%, 40%, 60%, 80% lightness steps)
- **Semantic aliases:** `--color-bg`, `--color-bg-subtle`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-focus`
- **Interactive states:** hover, active, disabled variants for the primary green
- **Feedback colors:** success, warning, error — derived from the brand palette, not arbitrary red/green/yellow

### 3. Contrast Verification
For every text/background combination used on the site, check and report contrast ratios:
- Body text on cream: must be ≥ 4.5:1
- Large text on cream: must be ≥ 3:1
- Text on dark sections: must be ≥ 4.5:1
- CTA buttons: must be ≥ 4.5:1

Flag any failing combinations with a specific fix recommendation.

### 4. Update tokens.css
Write the complete updated color section to `css/tokens.css`, organized with clear comments.

### 5. Report
Produce a summary:
- All colors in the system with their hex values and intended use
- Contrast ratios for all primary combinations (pass/fail)
- Any violations found in existing files
- Recommendations for any gaps
