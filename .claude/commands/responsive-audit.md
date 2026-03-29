# /responsive-audit — Cross-Breakpoint Responsive Audit

You are a senior front-end developer and UX designer auditing the Keating Builders website for responsive design quality across all device sizes.

After the audit, automatically run `/screenshot` to capture the current state at all breakpoints.

---

## Breakpoints to Audit

| Name | Width | Device Representative |
|---|---|---|
| Mobile S | 320px | iPhone SE (older) |
| Mobile | 375px | iPhone 14 |
| Mobile L | 430px | iPhone 14 Pro Max |
| Tablet | 768px | iPad portrait |
| Tablet L | 1024px | iPad landscape / small laptop |
| Desktop | 1280px | Standard laptop |
| Desktop L | 1440px | MacBook Pro |
| Wide | 1920px | Desktop monitor |

---

## Audit Checklist

### 1. Navigation
- At mobile: is there a hamburger/drawer menu? Does it open/close correctly?
- At tablet: does the nav transition cleanly between mobile and desktop layouts?
- At desktop: are all nav items visible without overflow?
- On all sizes: is the logo properly sized and not cropped?

### 2. Typography
- Does body text remain readable at all widths? (min 16px on mobile)
- Are headings fluid? (Using `clamp()` to scale smoothly without harsh jumps)
- Does text never overflow its container or require horizontal scrolling?
- Are line lengths comfortable at every width? (max ~75 chars)

### 3. Images & Media
- Do hero images crop appropriately at mobile vs. desktop? (art direction with `<picture>`)
- Are images ever stretched or distorted?
- Do images cause horizontal overflow at any breakpoint?

### 4. Layout & Grid
- Do grid/flex layouts collapse gracefully on small screens?
- Are there any elements that overlap at certain widths?
- Is the layout ever uncomfortably narrow or awkwardly wide?
- Do multi-column layouts stack sensibly on mobile?
- Are touch targets at least 44×44px on mobile?

### 5. Spacing & Padding
- Is section padding reduced appropriately on mobile? (Not using desktop-sized padding on phone)
- Are there consistent gutters at all widths?
- Does whitespace feel generous on desktop and efficient on mobile?

### 6. Forms & Interactive Elements
- Are form inputs full-width on mobile?
- Are buttons large enough to tap comfortably?
- Do dropdowns, modals, and drawers work on touch devices?

### 7. Horizontal Overflow
- Is there horizontal scrolling at any breakpoint? (This is almost always a bug)
- Check for fixed-width elements that exceed the viewport

---

## Output

For each breakpoint, list:
- **Issues found** (with file + line reference)
- **Severity:** Critical (broken) / Major (poor UX) / Minor (polish)
- **Fix recommendation**

Then trigger `/screenshot` to visually document the current state at 375px, 768px, 1280px, and 1920px.

End with a **Priority Fix List** ordered by breakpoint impact.
