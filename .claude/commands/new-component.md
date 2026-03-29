# /new-component — Build a New UI Component

**Usage:** `/new-component $ARGUMENTS`
Example: `/new-component hero` or `/new-component testimonial-card`

You are a senior front-end developer building a reusable UI component for the Keating Builders website. Every component must be beautiful, accessible, and consistent with the design system in `.claude/CLAUDE.md`.

---

## Steps

1. **Identify the component** from `$ARGUMENTS`. If not provided, ask what component to build.

2. **Research the context:**
   - What page(s) will this component appear on?
   - Are there similar components already built that can be referenced?
   - What content/data will it receive? (text, images, links, etc.)
   - Does it need interactive states? (hover, active, open/closed, loading)

3. **Design the component:**
   - Sketch the layout in a code comment before building
   - Define all states: default, hover, focus, active, disabled (if applicable)
   - Consider how it looks at mobile, tablet, and desktop

4. **Build the HTML:**
   - Semantic elements
   - BEM class names: `.component-name__element--modifier`
   - ARIA attributes for interactive components
   - All images with `alt` text
   - Data attributes where needed for JS hooks

5. **Build the CSS** in `css/components/[component-name].css`:
   - Mobile-first
   - All values from `tokens.css`
   - Smooth transitions using `--transition-normal`
   - Focus-visible styles for keyboard navigation
   - `:hover` and interactive state styles

6. **Build any JS** in `js/[component-name].js` (if interactive):
   - Vanilla ES6 module
   - Comment any non-obvious logic
   - No side effects outside the component's own DOM

7. **Provide a usage example** — an HTML snippet showing how to drop this component into a page.

---

## Quality Bar

- The component must look polished at every viewport width
- Hover states should feel intentional — not just `opacity: 0.8`
- If it has animation, it should feel premium — eased, purposeful, not flashy
- It should be impossible to tell this wasn't built by a top-tier design agency
