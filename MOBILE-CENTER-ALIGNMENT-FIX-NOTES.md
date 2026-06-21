# Mobile Center Alignment Fix — 2026-06-21

Issue reported:
- Mobile pages were no longer centered after the hard overflow fixes.
- The final CSS had margin-left:0 rules for many containers.

Fix:
- Restored centered mobile containers using width:min(100% - 28px, 1120px).
- Kept overflow protection on cards, coupons, review blocks, pricing blocks, and tables.
- Kept shellz-mobile-final-fix.css loaded last.
- Updated cache versions.
