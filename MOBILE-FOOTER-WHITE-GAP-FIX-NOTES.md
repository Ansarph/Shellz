# Mobile Footer White Gap Fix — 2026-06-21

Issue reported:
- White side and bottom portions appeared around the dark footer on mobile.

Fix:
- Made `.site-footer` full-bleed on mobile using 100vw.
- Kept footer inner content centered.
- Removed footer side gutters while keeping readable inner padding.
- Added safe-area bottom padding for mobile browsers.
- Kept `shellz-mobile-final-fix.css` loaded last.
