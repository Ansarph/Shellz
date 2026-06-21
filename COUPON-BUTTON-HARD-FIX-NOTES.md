# Coupon Button Hard Fix - 2026-06-21

Fixed Show Code / Get Deal button behavior across Shellz coupon and review pages.

Updates made:
- Added a capture-phase coupon click handler so buttons work reliably even if older handlers conflict.
- Fixed Show Code buttons to reveal a modal with the coupon code.
- Auto-opens the provider page in a new tab for real coupon codes, matching coupon-site UX.
- Fixed Get Deal buttons to open the provider/deal link directly.
- Added clipboard fallback behavior for mobile and non-secure contexts.
- Added high z-index modal CSS so the popup is not hidden behind headers/sticky CTAs.
- Forced coupon buttons to a single-column layout so labels are not clipped on mobile.
- Added duplicate CSS override in coupon-cards.css for pages that load it after style.css.

Files changed:
- script.js
- style.css
- coupon-cards.css
