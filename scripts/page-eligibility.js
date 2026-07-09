const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const pricing = JSON.parse(fs.readFileSync(path.join(root, 'data', 'pricing.json'), 'utf8')).plans;
const evidence = JSON.parse(fs.readFileSync(path.join(root, 'data', 'evidence.json'), 'utf8')).providers;

function pageEligibility(planKey, options = {}) {
  const plan = pricing[planKey];
  if (!plan) return { score: -99, eligible: false, reasons: ['Unknown plan key'] };
  const ev = evidence[plan.provider_key] || {};
  let score = 0;
  const reasons = [];
  const add = (points, reason) => { score += points; reasons.push(`${points > 0 ? '+' : ''}${points} ${reason}`); };

  add(2, 'Distinct provider + exact-plan renewal intent');
  if (plan.plan) add(2, 'Exact plan name is structured');
  else add(-3, 'Missing exact plan context');

  const hasRenewal = Number.isFinite(plan.renewalMonthly) || Number.isFinite(plan.renewalAnnual);
  if (hasRenewal) add(2, 'Structured renewal amount exists');
  else add(-3, 'Structured renewal amount is missing');

  if (ev.checkout && ev.checkout.published) add(3, 'Shellz checkout evidence is published');
  else add(-2, 'No published Shellz checkout evidence');

  const calcReady = Number.isFinite(plan.introMonthly) && hasRenewal && Number.isFinite(plan.introTermMonths) && Number.isFinite(plan.renewalTermMonths);
  if (calcReady) add(2, 'Inputs support a unique term-aware calculation');

  if (options.searchConsoleOpportunity) add(2, 'Search Console opportunity supplied');
  if (!plan.regionCurrency || /not captured/i.test(plan.regionCurrency)) add(-3, 'Region/currency context is incomplete');
  if (options.keywordSwapOnly) add(-5, 'Only a keyword/location swap');
  if (options.sameRankingAsSibling) add(-4, 'Same result/ranking as a sibling page');

  return { planKey, provider: plan.provider, plan: plan.plan, score, eligible: score >= 7, reasons };
}

function comparisonEligibility(aKey, bKey) {
  const a = pageEligibility(aKey);
  const b = pageEligibility(bKey);
  const aPlan = pricing[aKey];
  const bPlan = pricing[bKey];
  let score = Math.min(a.score, b.score);
  const reasons = [`Base score uses weaker data side: ${score}`];
  const comparable = aPlan && bPlan && Number.isFinite(aPlan.renewalTermMonths) && aPlan.renewalTermMonths === bPlan.renewalTermMonths && Number.isFinite(aPlan.renewalMonthly) && Number.isFinite(bPlan.renewalMonthly);
  if (comparable) { score += 2; reasons.push('+2 Comparable renewal terms and monthly equivalents'); }
  else { score -= 3; reasons.push('-3 Billing terms/renewal units are not safely comparable'); }
  return { pair: [aKey, bKey], score, eligible: score >= 7, reasons };
}

if (require.main === module) {
  const rows = Object.keys(pricing).map((key) => pageEligibility(key));
  console.table(rows.map(({planKey, provider, plan, score, eligible}) => ({planKey, provider, plan, score, eligible})));
}

module.exports = { pageEligibility, comparisonEligibility };
