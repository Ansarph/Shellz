const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const pricing = JSON.parse(fs.readFileSync(path.join(root, 'data', 'pricing.json'), 'utf8')).plans;
const { pageEligibility, comparisonEligibility } = require('./page-eligibility');

const renewal = Object.keys(pricing).map((key) => pageEligibility(key));
const keys = Object.keys(pricing);
const comparisons = [];
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) comparisons.push(comparisonEligibility(keys[i], keys[j]));
}
const report = {
  mode: 'PREVIEW_ONLY',
  generated_at: '2026-07-09',
  rule: 'No page is published automatically. Score 7+ means candidate for manual review, not auto-indexing.',
  renewal_candidates: renewal.sort((a,b) => b.score-a.score),
  comparison_candidates: comparisons.sort((a,b) => b.score-a.score).slice(0, 25)
};
fs.writeFileSync(path.join(root, 'pseo-opportunities.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`PREVIEW ONLY: ${renewal.filter(x=>x.eligible).length} renewal candidates score 7+; ${comparisons.filter(x=>x.eligible).length} comparison candidates score 7+.`);
console.log('Wrote pseo-opportunities.json. No HTML pages were created.');
