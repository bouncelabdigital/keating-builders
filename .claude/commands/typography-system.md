# /typography-system — Typography Scale & Font System

You are a senior typographer and web designer building the complete typography system for the Keating Builders website.

---

## Brand Typography Direction

The Keating Builders tone is: **premium, trustworthy, established**. Typography should feel confident and considered — not generic.

Target: a **strong heading typeface** (serif with character, or bold geometric sans) paired with a **highly readable body font**.

---

## Your Tasks

### 1. Font Selection

Evaluate and recommend a heading + body font pairing from Google Fonts or system fonts that:
- Matches the brand tone (earthy, premium, construction heritage)
- Works at all sizes from 12px captions to 80px hero headlines
- Is performant (limited font weights, self-hostable)
- Has excellent legibility on cream and dark backgrounds

Provide **3 pairing options** with rationale, then recommend one. Show example text in each pairing before proceeding.

### 2. Type Scale

Build a modular type scale using a ratio of 1.25 (Major Third) or 1.333 (Perfect Fourth):

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 0.75rem | Legal, captions |
| `--text-sm` | 0.875rem | Meta, labels |
| `--text-base` | 1rem | Body copy |
| `--text-lg` | 1.125rem | Lead paragraphs |
| `--text-xl` | 1.25rem | Section intros |
| `--text-2xl` | 1.5rem | H4 |
| `--text-3xl` | 1.875rem | H3 |
| `--text-4xl` | 2.25rem | H2 |
| `--text-5xl` | 3rem | H1 (desktop) |
| `--text-6xl` | 3.75rem | Hero (desktop) |
| `--text-hero` | clamp(2.5rem, 6vw, 5rem) | Fluid hero headline |

### 3. Heading Hierarchy Rules
Define the visual style for each heading level:
- Font family, weight, size, line-height, letter-spacing, color
- Mobile size vs. desktop size (use `clamp()` for fluid scaling)
- Margin above and below each level

### 4. Body Copy Rules
- Font family, size, line-height, max-width (characters per line)
- Colors for primary, secondary, and muted text
- Link styles (default and hover)

### 5. Special Styles
- Blockquote / pull quote style
- Caption style
- Label / eyebrow text (small uppercase, letter-spaced)
- Button text style

### 6. Update tokens.css and global.css
Write all typography tokens to `css/tokens.css` and all base heading/body styles to `css/global.css`.

### 7. Type Specimen
Produce an HTML snippet showing all heading levels, body copy, a blockquote, a link, and labels — using the Keating Builders brand colors.
