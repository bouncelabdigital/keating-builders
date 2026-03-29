# /accessibility-audit — WCAG 2.1 AA Compliance Audit

You are a senior accessibility engineer conducting a thorough audit of the Keating Builders website against WCAG 2.1 AA guidelines.

Accessibility is not optional. Every issue found here is a legal risk and a barrier to real users.

---

## Audit Checklist

### 1. Perceivable

**Images (1.1.1)**
- All `<img>` elements have `alt` text
- Decorative images have `alt=""`
- Complex images (charts, infographics) have long descriptions

**Color Contrast (1.4.3 / 1.4.6)**
- Body text on all backgrounds: contrast ratio ≥ 4.5:1
- Large text (18px+ regular or 14px+ bold): ≥ 3:1
- UI components and focus indicators: ≥ 3:1
- Test all text/background combinations used in the design

**Text Resize (1.4.4)**
- Does the layout remain usable when text is scaled to 200%?
- No text in images (unscalable)

**Reflow (1.4.10)**
- Does content reflow at 320px width without horizontal scrolling?

**Non-text Contrast (1.4.11)**
- Form inputs, buttons, and icons: ≥ 3:1 contrast against adjacent colors

### 2. Operable

**Keyboard Navigation (2.1.1)**
- Every interactive element reachable by Tab key
- Logical tab order matches visual order
- No keyboard traps (can always Tab out of components)
- Custom components (modals, dropdowns, sliders) implement correct keyboard patterns

**Focus Visible (2.4.7 / 2.4.11)**
- Every focused element has a visible, high-contrast focus indicator
- Focus ring is not hidden with `outline: none` without a custom replacement

**Skip Links (2.4.1)**
- A "Skip to main content" link is the first focusable element on every page

**Page Titles (2.4.2)**
- Every page has a unique, descriptive `<title>` tag

**Link Purpose (2.4.4)**
- Every link's purpose is clear from its text (no bare "click here" or "read more")
- Icon-only links have `aria-label`

### 3. Understandable

**Language (3.1.1)**
- `<html lang="en">` set on every page

**Labels (3.3.2)**
- Every form input has an associated `<label>` (not just placeholder text)
- Required fields are marked with `aria-required="true"`
- Error messages are programmatically associated with their input

### 4. Robust

**Semantic HTML (4.1.1)**
- No duplicate `id` attributes
- All tags properly opened and closed
- No deprecated HTML elements

**ARIA (4.1.2)**
- All custom interactive widgets have correct ARIA roles, states, and properties
- `aria-label` or `aria-labelledby` on all landmark regions
- Live regions (`aria-live`) used for dynamic content updates

---

## Output

For each issue found:
- **WCAG criterion violated** (e.g. 1.4.3 Contrast Minimum)
- **Severity:** Critical / Major / Minor
- **Location:** file + line number
- **Current state:** what's wrong
- **Required fix:** exact code change

End with a **Remediation Priority List** — fix Critical issues before launch, Major before client review.
