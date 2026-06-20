# CSS Consolidation — 2026-06-20

## Why this was done

A full code audit found that style.css and lovable-theme.css had accumulated
dead CSS from at least 5-6 earlier visual redesigns (warm-neutral/brown theme,
cream/orange theme, a blue-primary theme, and the current teal/amber
"New-Gen" theme), none of which had been removed when superseded. This made
every future styling fix riskier, because new rules had to fight old ones
via !important to win, and nobody could tell by reading the file which rule
actually controlled what rendered.

This update removes the dead layers without changing how the site looks.
Every change below was verified by resolving the real CSS cascade in code
(not by eye) and confirming the winning value for every live class is
byte-for-byte identical before and after.

## What changed

**Design tokens (:root)**
- style.css had 10 separate, conflicting `:root` blocks (different colors
  for --primary, --bg, --ink, etc. depending on which old theme last wrote
  to that file). Consolidated into ONE `:root` block at the top of
  style.css, containing only the values that were actually winning before
  this change.
- lovable-theme.css had 2 more `:root` blocks, partly duplicating
  style.css's tokens and partly defining unused variables (--cta,
  --cta-dark, --trust-blue — confirmed unused anywhere). Both removed;
  lovable-theme.css now relies on the single token set in style.css.

**Dead selectors removed**
- Scanned every class-based CSS selector against every class actually
  used across all 81 live HTML pages.
- Removed 501 CSS rules and trimmed dead selectors from 92 more, across
  style.css, lovable-theme.css, and coupon-cards.css — all targeting
  classes that don't exist anywhere in the site's HTML (leftovers from
  earlier markup that has since been changed or removed), e.g. bare
  `.hero`, `.hero-card`, `.review-hero`, `.article-hero`, `.category-hero`,
  `.compare-hero`, `.filter-btn`, `.coupon-card`, `.score-callout`.
- Did NOT remove selectors for classes still in use, even ones combined
  with now-dead classes in the same comma-separated rule (e.g. kept
  `.page-hero` and `.newgen-hero` while dropping `.review-hero` from the
  same rule).

**Bug fix**
- `color: var(--dark)` on `.ai-builder-grid h3` referenced a variable that
  was never defined anywhere (dead reference, silently falling back to
  inherited color). Changed to `var(--ink)`, the token that was clearly
  intended.

**File size**
- style.css: 19.7% smaller (314KB -> 253KB)
- lovable-theme.css: 13.6% smaller (60KB -> 52KB)
- coupon-cards.css: 27.2% smaller (20KB -> 14KB)

**Cache busting**
- All HTML files updated to `?v=20260620-css-consolidation` for
  style.css, coupon-cards.css, and lovable-theme.css.

## What did NOT change

- No color, spacing, font, or layout values were edited for any class
  currently used on the live site. This was a removal of dead code only.
- Page structure, content, and all CRO/conversion elements (hero CTAs,
  sticky mobile bar, trust chips, etc.) are untouched.
- `.page-hero .btn.primary` (white bg / navy text / white border on the
  dark hero) and `.page-hero .btn.secondary` were checked specifically
  because they looked suspicious on first read (an old tan/beige border
  color was still present in an earlier, now-superseded rule) — verified
  these already resolve correctly via a later override and needed no fix.

## How this was verified

A script resolved, for every one of the ~430 classes used anywhere in the
site's HTML, the actual winning CSS value for every property declared
against that class — before and after the cleanup — across all three
stylesheets, respecting the real file load order (style.css ->
coupon-cards.css -> lovable-theme.css) and respecting !important and
specificity. Result: 1,994 winning declarations checked, 0 differences.

## Recommended follow-up (not done in this pass)

The site still has 60+ distinct max-width breakpoints in media queries
instead of a standard 3-4 tier system, and heavy use of !important
remains in the surviving rules (this pass removed dead rules, it did not
rewrite live ones). A second pass to standardize breakpoints and reduce
!important reliance would further reduce risk on future edits, but
touches live, currently-rendering rules and needs visual QA on a staging
environment rather than code-only verification.
