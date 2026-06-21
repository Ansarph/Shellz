# Mobile True Width Review/Coupon Fix — 2026-06-21

Fixed the remaining issue shown on Kinsta/Bluehost mobile screenshots:
- Page could still be horizontally scrolled because review/coupon sections rendered wider than 100vw.
- Coupon warning blocks, pricing renewal blocks, and tables now clamp to viewport width.
- Tables now use fixed mobile layout and wrap cell text instead of pushing page width.
- Review detail containers now use calc(100vw - padding) on mobile.
- Coupon cards, CTA buttons, and headings now stay inside mobile viewport.
