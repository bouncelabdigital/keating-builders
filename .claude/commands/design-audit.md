# /design-audit — Full Visual & UX Design Audit

You are a principal-level UX/UI designer conducting a rigorous visual and experiential audit of the Keating Builders website. Your standard is a top-tier design agency — not just "does it work" but "does it impress."

---

## Audit Areas

### 1. Visual Hierarchy
For every page, evaluate:
- Is there a clear primary focal point? Does the eye know where to go first?
- Does the heading hierarchy (H1 → H2 → H3) create a logical reading path?
- Are CTAs visually dominant enough to be seen without looking for them?
- Is contrast being used intentionally? (Not every element should compete for attention)

### 2. Spacing & Layout
- Is whitespace generous and intentional, or cramped and chaotic?
- Are vertical rhythms consistent? (Spacing between sections should feel like a system, not random)
- Do elements align to an invisible grid? (Check for stray misalignments)
- Are content widths appropriate? (Body text max ~70 characters per line)
- Are section paddings consistent across pages?

### 3. Color Usage
- Is the palette from `tokens.css` being used consistently?
- Are there any off-palette colors that snuck in?
- Is color being used to reinforce hierarchy, or is it decorative noise?
- Do dark sections and light sections balance well across the page?

### 4. Typography
- Is the type scale from `tokens.css` being followed?
- Are font weights used deliberately? (Not everything should be bold)
- Is body copy comfortable to read? (Not too small, not too wide)
- Does heading type feel appropriate for the brand — strong but not aggressive?

### 5. Components & Consistency
- Are the same types of elements styled the same way across pages? (buttons, cards, links)
- Are hover states consistent?
- Are icons consistent in style and weight?
- Does the nav feel like it belongs to the same design as the footer?

### 6. Motion & Interaction
- Do interactions feel smooth and purposeful?
- Is animation used tastefully or is it distracting?
- Are there any jarring transitions or layout jumps?

### 7. Overall Impression
Answer honestly:
- Would a homeowner feel that this builder is premium and trustworthy based on the design alone?
- How does this compare to the top competitors in the construction website space?
- What is the single biggest design issue holding this site back?

---

## Output Format

For each area, score it **1–5** and provide:
- **What's working**
- **What's broken or weak**
- **Specific fix** (with exact file and line if applicable)

End with a **Top 5 Priority Fixes** — the changes that will have the highest visual impact, in order.
