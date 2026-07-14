SHELLZ DATA ENGINE V1
Updated: 2026-07-09

SOURCE OF TRUTH
- data/providers.json        Stable provider URLs, tracking links, tags and categories.
- data/pricing.json          Exact-plan pricing snapshots. Missing values stay null.
- data/coupon-checks.json    Coupon/deal page and checkout-evidence status.
- data/evidence.json         Checkout, renewal, speed, uptime and support evidence status.

NORMAL UPDATE FLOW
1. Edit the JSON source file that contains the new verified information.
2. Keep missing information as null/false. Do not estimate a price or mark evidence published without support.
3. Run:
   node scripts/build-data-js.js
4. Preview pSEO opportunities:
   node scripts/generate-renewal-pages.js
5. Review pseo-opportunities.json.

PSEO SAFETY RULE
The generator is PREVIEW ONLY. It creates no HTML pages.
A score of 7 or higher means only "candidate for manual review". It is not permission to auto-publish or auto-index.

MAINTENANCE DASHBOARD
Open data-status.html on the live/static site path to inspect data completeness. The page contains noindex,nofollow and is intentionally absent from sitemap.xml.

CONNECTED PUBLIC PAGES
- index.html
- hosting-renewal-price-database.html
- hosting-cost-calculator.html
- hosting-testing-status.html
- web-hosting-finder.html

COMPATIBILITY
hosting-prices.js is retained only as a deprecated stub so old repository references do not become confusing. Current connected pages use shellz-data.js generated from /data/*.json.
