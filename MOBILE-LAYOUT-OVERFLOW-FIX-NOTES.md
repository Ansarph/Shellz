# Shellz Mobile Layout Overflow Fix - 2026-06-19

This patch fixes the mobile homepage layout issues seen in the uploaded phone screenshot:

- Hero text and eyebrow overflowing to the right
- CTA buttons extending beyond the phone viewport
- Trust chips forcing horizontal page scroll
- Sticky mobile CTA showing one visible button and a blank area
- Fast-path card being crowded by the sticky bottom CTA

The fix is CSS-only and keeps the current CRO structure intact.
