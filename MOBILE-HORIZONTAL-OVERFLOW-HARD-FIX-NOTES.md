# Mobile Horizontal Overflow Hard Fix — 2026-06-21

Problem found from screenshot:
- Coupon pages were still wider than the mobile viewport.
- Coupon/deal cards used desktop grid columns and long headings/buttons could push the page sideways.

Fixed:
- Added mobile-only hard width limits for all containers, coupon sections, review detail sections, sources cards, and coupon cards.
- Forced coupon cards into one-column mobile layout.
- Forced coupon action buttons and links to stay inside the viewport.
- Hid coupon peel/code columns on small screens where they cause overflow.
- Added stronger heading/text wrapping rules.
- Added safe table horizontal scrolling inside wrappers instead of page-wide scrolling.
- Added viewport-fit=cover and cache-busting updates.
