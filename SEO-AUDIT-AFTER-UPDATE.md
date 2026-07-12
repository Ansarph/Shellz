# Shellz SEO Audit After Update — 9 July 2026

## Score

**Before: 63/100**  
**After local package audit: 88/100**

This is a 100-point SEO-readiness audit of the updated static package. It is **not a Google ranking guarantee**. The score is intentionally held below the 90s because the strongest remaining gap is first-hand proof: this ZIP still lacks dated final checkout captures for Hostinger, Bluehost, HostGator, and WPX, plus controlled speed tests, long-term uptime logs, and timed support evidence for the flagship reviews.

## Category scores

| Category | Score |
|---|---:|
| Technical crawl/indexability | 18/18 |
| On-page clarity and hygiene | 17/17 |
| Architecture and internal linking | 12/13 |
| Trust and evidence transparency | 13/14 |
| Content differentiation and first-hand proof | 9/14 |
| CTR/CRO buyer journey | 10/11 |
| Pricing data consistency | 9/13 |
| **Total** | **88/100** |

## QA results

- HTML pages checked: 101
- Broken internal HTML links: 0
- Missing local assets: 0
- JSON-LD parse errors: 0
- H1 issues: 0
- Missing title/meta description: 0
- Duplicate IDs: 0 pages
- Duplicate titles: 0
- Duplicate meta descriptions: 0
- Visible internal planning-text hits: 0
- Unsupported “since 2020 / 5+ years” hits: 0
- Star-rating pages: 0
- Maximum links in the compact site footer: 19

## Main fixes completed

1. Removed unsupported author-history claims and rewrote the author profile around the real Shellz editorial focus.
2. Removed visible template/SEO-planning language and the duplicated “provider’s provider checkout page” typo.
3. Removed decorative five-star review labels and kept buyer-fit/evidence language instead.
4. Rebuilt the homepage around the Shellz positioning: second bill, evidence status, exact-plan renewal examples, four buyer paths, three key guides, latest checks, and methodology.
5. Reworked Hostinger, Bluehost, and HostGator so each has a different decision angle and a clear evidence-status section.
6. Rebuilt the testing-status page to separate coupon pages, public pricing research, captured checkout proof, performance evidence, and support evidence.
7. Rebuilt the renewal database as an exact-plan “First Bill vs Second Bill” tracker.
8. Added the structured `/data/*.json` source layer and generated `shellz-data.js`; the homepage, renewal tracker, calculator, testing status, and Hosting Finder now consume the central data bundle where connected.
9. Aligned the calculator with exact plan and billing-term inputs instead of provider-wide renewal assumptions.
10. Added a three-build evidence roadmap to the under-$25 guide without inventing completed experiments.
11. Reduced the sitewide footer link cloud to a compact buyer/trust footer across all HTML pages.
12. Updated methodology language from an implied scoring framework to buyer-fit research plus published-proof status.

## Remaining SEO risks

- The strongest remaining gap is **first-hand proof depth**. Public provider research and coupon-status pages are useful, but they are not substitutes for dated checkout captures, controlled speed tests, long-term uptime logs, dashboard evidence, or timed support tests.
- Several older review pages still have long bodies and inherited legacy section patterns, even after the public planning language and star labels were removed.
- The central pricing snapshot file improves consistency, but many source rows still lack captured region/currency context or a complete first-invoice/renewal-term dataset.
- Three-year cost is intentionally not calculated until the exact term and invoice inputs are complete.

## Highest-value next actions

1. Publish one dated checkout evidence block each for Hostinger, Bluehost, HostGator SNAPPY, and WPX SAVE79: exact plan, region/currency, billing term, code/deal behavior, amount due, renewal line, and screenshot.
2. Run a controlled four-host WordPress speed/TTFB test with the same site, test locations, cache rules, and documented methodology.
3. Start 30- to 90-day uptime monitoring and publish the raw monitoring period and incident notes.
4. Use Google Search Console to identify the five pages with impressions but low CTR, then rewrite only their title and description based on the actual query mix.

## Post-audit maintenance — Hosting Finder, July 9, 2026

The Web Hosting Finder was upgraded after the 88/100 site audit. The previous finder used a priority-order rule where a single answer could override the other three and several different answer combinations could collapse into the same generic path. The result card also had a dark-theme contrast conflict on the live layout.

The updated finder now:

- weighs all four answers instead of using a single first-match rule;
- offers eight reachable decision profiles: budget shared, beginner shared/WordPress, WordPress-focused, ecommerce-ready, managed WordPress, managed cloud, VPS, and domain-first/static-site;
- shows a best match, match-strength label, the four selected answers, a close alternative, and three practical next steps;
- persists selections in the URL so the result can be revisited or shared;
- includes a clear reset action and a visible limitation that the finder is not a speed, uptime, or support benchmark;
- uses a high-contrast light result panel to avoid the previous dark-text-on-dark-background conflict.

This maintenance improves buyer-journey usefulness, but the overall package audit remains **88/100** until the first-hand checkout/performance evidence gaps listed above are closed.


## Data Engine v1 architecture update — 2026-07-09

Shellz now has a structured build-time data layer for providers, exact-plan pricing, coupon/deal checks, and evidence status. The homepage price fields, renewal tracker, calculator presets, public testing-status table, and Hosting Finder research bridge consume the generated `shellz-data.js` bundle built from `/data/*.json`.

A preview-only pSEO eligibility system was added. It does not publish pages. Missing values remain `null`, term/currency gaps receive penalties, and a score of 7+ only creates a manual-review candidate.

**SEO readiness score remains 88/100.** The architecture and consistency risk improved, but the score is intentionally not raised until Shellz adds dated first-hand checkout captures and controlled speed/uptime/support evidence.

## Homepage visual QA correction — 2026-07-09

After the Data Engine v1 integration, the homepage screenshot exposed a presentation regression: the shared `.proof-grid` CSS only styled `div` children while the rebuilt homepage used `article` elements, the default three-column buyer-path grid created a 3+1 layout for four choices, and the new editorial/latest-update structures had no dedicated card rules. The header and footer also depended on `assets/shellz-logo.png`, which is fragile during manual root-file GitHub updates.

The correction adds a homepage-only stylesheet, balances the four buyer paths, restores card hierarchy and readable status blocks, styles the guide/latest-update grids, improves the exact-plan table actions and trust panel, and adds a root-level copy of the existing Shellz logo. Root HTML brand-logo references now point to `shellz-logo.png`. Public “this ZIP” wording was removed from the homepage and flagship review pages.

The SEO readiness score remains **88/100** because these are visual/UX and packaging-resilience fixes; they do not close the first-hand checkout/performance evidence gap.

## 2026-07-12 Hostinger Evidence Update

Shellz Data Engine v1 now contains published Hostinger Premium cart evidence.

Added evidence:
- 12-month Premium cart with UROFF10: $43.09 total, 10% discount, renewal note $10.99/mo for 12 months.
- 12-month Premium cart with BLOGWITHBP: $43.09 total, 10% discount, renewal note $10.99/mo for 12 months.
- 24-month Premium cart with BLOGWITHBP: $75.38 total, 10% discount, renewal note $10.99/mo for 12 months.
- 48-month Premium cart with BLOGWITHBP: $129.17 total, 10% discount, renewal note $10.99/mo for 12 months.

Data Engine result:
- Hostinger checkout evidence: published.
- Hostinger coupon evidence: tested rows added for UROFF10 and BLOGWITHBP.
- Hostinger renewal evidence: shellz-cart-evidence.
- pSEO preview now shows 3 Hostinger renewal candidates score 11/100-style threshold points and 0 comparison candidates; no pages are auto-generated by the script.

Remaining limitation: no independent Hostinger speed, uptime or support test has been published.



## 2026-07-12 Bluehost Starter Renewal Evidence Update
- Added Bluehost Starter 36-month checkout evidence page with two screenshots.
- Updated Data Engine pricing, coupon and evidence JSON for Bluehost cart proof.
- Added clean robots.txt without unsupported Content-Signal directive.
- Rebuilt shellz-data.js and pSEO preview report after evidence update.


## HostGator SNAPPY Evidence Update — 2026-07-12

Added dated HostGator Hatchling checkout evidence for SNAPPY. The 1-year cart shows SNAPPY applied, $47.40 due today, and renewal at $13.19/mo. The 3-year cart shows SNAPPY applied, $99.00 due today, and renewal at $10.99/mo. These are checkout/coupon and renewal-note captures only; speed, uptime and support remain unpublished evidence types.


## Shellz Evidence Hub v1 — 2026-07-12

Added `hosting-checkout-evidence.html` as the central evidence hub and `hostinger-vs-bluehost-vs-hostgator-renewal-cost.html` as a manual, limitation-labelled comparison page. Updated homepage proof messaging, key review pages, ranking pages, renewal tracker, testing status and data-status links. The comparison page is intentionally not an automated equal-term claim; it compares captured cart examples with plan/term differences clearly stated.

Status: evidence architecture strengthened; SEO score remains 88/100 until broader performance, uptime and support evidence is published.


## ScalaHosting SPanel Evidence Update — 2026-07-12

Added three ScalaHosting 12-month SPanel checkout screenshots for Mini, Start and Advanced plans. The new page `scalahosting-checkout-evidence.html` separates first-invoice totals from estimated renewal amounts based on the displayed regular monthly price. It explicitly states that this is not a separate final renewal invoice, speed test, uptime test or support test.

New captured examples:
- Mini SPanel: $35.40 first invoice, $11.95/mo displayed regular price, estimated $143.40 next 12-month renewal.
- Start SPanel: $71.40 first invoice, $14.95/mo displayed regular price, estimated $179.40 next 12-month renewal.
- Advanced SPanel: $119.40 first invoice, $19.95/mo displayed regular price, estimated $239.40 next 12-month renewal.

Data Engine updated: `data/pricing.json`, `data/evidence.json`, `data/coupon-checks.json`, and `shellz-data.js`.

## 2026-07-12 WPX SAVE79 evidence update
- Added WPX SAVE79 evidence page showing monthly Starter cart accepted SAVE79 and 1-year Starter cart rejected SAVE79.
- Updated Data Engine pricing, coupon and evidence files.
- Updated evidence hub, homepage proof cards, WPX coupon page and WPX review.
- Preserved the rule that coupon evidence does not imply speed, uptime or support testing.
