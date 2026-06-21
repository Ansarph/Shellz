# Final Mobile Readability Fix — 2026-06-21

Checked the latest screen recording.

Issue remaining:
- Mobile horizontal overflow was mostly fixed, but pricing/renewal tables were squeezed too tightly.
- Some table headers wrapped letter-by-letter, making the mobile page look broken.

Fix:
- Tables now scroll inside their own card instead of squeezing columns.
- Mobile table text uses normal word wrapping.
- Added “Swipe table sideways” hint below scrollable tables.
- Kept final CSS file loaded last after all other CSS files.
