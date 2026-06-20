# Hosting Calculator Fix — 2026-06-20

Fixed:
- `hosting-cost-calculator.html`
- `script.js`

Problem found:
- The calculator script was not reliably updating the first billing term because the JavaScript expected an old result ID in some places.
- The calculator needed a more robust script that works even if result IDs are changed later.

Fix applied:
- Added a robust calculator script that reads:
  - introPrice
  - renewalPrice
  - billingMonths
  - domainCost
  - emailCost
  - addonCost
- Updates:
  - firstYearCost
  - renewalYearCost
  - renewalIncrease
  - calcSummary
  - calcWarning
- Added live recalculation on input/change.
- Added submit button support.
- Preserved/restored Shellz CTA click tracking.
- Updated script cache versions across pages.

Validation:
- Internal href issues: 0
- Local src issues: 0
- Duplicate IDs: 0
- JSON-LD parse errors: 0
- CSS brace issues: 0
- JavaScript syntax issues: 0
