// Shellz exact-plan pricing snapshots. Update this file first when a checked plan or term changes.
// These are dated public-pricing research snapshots, not a live price feed.
window.SHELLZ_HOSTING_PRICE_SNAPSHOTS = {
  "hostinger-premium": {
    "provider": "Hostinger",
    "plan": "Premium",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "$2.99/mo on long-term promo",
    "introMonthly": "2.99",
    "introTerm": "Long-term promo; exact term not captured in source row",
    "renewalLabel": "$10.99/mo renewal shown on provider pricing page",
    "renewalMonthly": "10.99",
    "renewalTerm": "Provider pricing page; exact renewal cycle should be rechecked",
    "lastChecked": "June 2026",
    "status": "Public pricing research; verify checkout"
  },
  "bluehost-starter": {
    "provider": "Bluehost",
    "plan": "Starter",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "$3.99/mo commonly shown for 36-month term",
    "introMonthly": "3.99",
    "introTerm": "36 months",
    "renewalLabel": "$9.99/mo 36-month renewal listed for Starter",
    "renewalMonthly": "9.99",
    "renewalTerm": "36 months",
    "lastChecked": "June 2026",
    "status": "Public pricing research; verify checkout"
  },
  "namecheap-stellar": {
    "provider": "Namecheap",
    "plan": "Stellar",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "From about $1.98/mo on promo",
    "introMonthly": "1.98",
    "introTerm": "Promo term varies; verify live plan",
    "renewalLabel": "$55.88/year renewal listed for Stellar after May 2026",
    "renewalAnnual": "55.88",
    "renewalTerm": "1 year",
    "lastChecked": "June 2026",
    "status": "Public pricing research; verify current pricing notice and checkout"
  },
  "siteground-startup": {
    "provider": "SiteGround",
    "plan": "StartUp",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "Promos can be much lower than standard price",
    "introTerm": "Promo term varies; verify live plan",
    "renewalLabel": "$17.99/mo for 12-month StartUp standard pricing",
    "renewalMonthly": "17.99",
    "renewalTerm": "12 months",
    "lastChecked": "June 2026",
    "status": "Public pricing research; verify checkout"
  },
  "dreamhost-launch": {
    "provider": "DreamHost",
    "plan": "Web Hosting Launch",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "First-year promo shown around $2.89/mo in provider currency",
    "introMonthly": "2.89",
    "introTerm": "First year",
    "renewalLabel": "Auto-renews around $10.99/mo after first year in provider currency",
    "renewalMonthly": "10.99",
    "renewalTerm": "After first year; verify current billing cycle",
    "lastChecked": "June 2026",
    "status": "Public pricing research; verify region, currency and checkout"
  },
  "hostgator-hatchling": {
    "provider": "HostGator",
    "plan": "Hatchling / shared",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "Intro price changes by coupon and term",
    "introTerm": "Varies",
    "renewalLabel": "Public renewal details may require account/checkout confirmation",
    "renewalTerm": "Not captured",
    "lastChecked": "June 2026",
    "status": "Coupon page published; renewal needs live confirmation"
  },
  "wpx-managed-wordpress": {
    "provider": "WPX Hosting",
    "plan": "Managed WordPress hosting",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "Higher starting price than shared hosting",
    "introTerm": "Monthly or annual; verify live plan",
    "renewalLabel": "Not a typical cheap shared-host renewal model",
    "renewalTerm": "Verify monthly vs annual pricing",
    "lastChecked": "June 2026",
    "status": "SAVE79 page published; verify checkout and eligibility"
  },
  "cloudways-managed-cloud": {
    "provider": "Cloudways",
    "plan": "Managed cloud hosting",
    "regionCurrency": "Provider currency; region not captured in source row",
    "introLabel": "Monthly cloud plan pricing",
    "introTerm": "Monthly / usage model",
    "renewalLabel": "Usually usage/monthly pricing, not a simple shared-host renewal",
    "renewalTerm": "Usage/monthly model",
    "lastChecked": "June 2026",
    "status": "Public plan research; compare provider, server size and add-ons"
  }
};
(function(){
  function hydrate(){
    var data=window.SHELLZ_HOSTING_PRICE_SNAPSHOTS||{};
    document.querySelectorAll('[data-price-key][data-price-field]').forEach(function(node){
      var row=data[node.getAttribute('data-price-key')];
      var field=node.getAttribute('data-price-field');
      if(row && row[field]!==undefined) node.textContent=row[field];
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',hydrate); else hydrate();
})();
