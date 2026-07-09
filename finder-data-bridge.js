(function(){
  var tagMap = {
    budget:['budget','shared'], shared:['shared','beginner'], wordpress:['wordpress','beginner'], ecommerce:['wordpress','business'],
    managed:['managed-wordpress','performance'], cloud:['managed-cloud','cloud'], vps:['vps'], domain:['domain']
  };
  function render(detail){
    var target = document.getElementById('finderDataResearch');
    if (!target || !window.SHELLZ_DATA || !detail) return;
    var tags = tagMap[detail.profileKey] || [];
    var providers = window.SHELLZ_DATA.providers.providers || {};
    var evidence = window.SHELLZ_DATA.evidence.providers || {};
    var pricing = window.SHELLZ_DATA.pricing.plans || {};
    var planProviders = {};
    Object.keys(pricing).forEach(function(k){ planProviders[pricing[k].provider_key] = true; });
    var matches = Object.keys(providers).map(function(key){
      var p = providers[key];
      var match = tags.filter(function(t){ return (p.tags||[]).indexOf(t) !== -1; }).length;
      var evidenceBonus = planProviders[key] ? 1 : 0;
      return {key:key, provider:p, score:match*3 + evidenceBonus};
    }).filter(function(x){ return x.score > 0; }).sort(function(a,b){ return b.score-a.score; }).slice(0,3);
    target.innerHTML = '<div class="finder-data-research-head"><span>Structured Shellz research</span><strong>Relevant provider pages to inspect next</strong><p>These are dataset matches, not a provider ranking. Open the exact plan/evidence pages and compare the current cart before buying.</p></div>' +
      '<div class="finder-data-research-grid">' + matches.map(function(x){
        var e = evidence[x.key] || {};
        var status = e.checkout && e.checkout.published ? 'Checkout proof published' : (planProviders[x.key] ? 'Exact-plan pricing row available' : 'Category research available');
        return '<a href="' + x.provider.review_url + '"><strong>' + x.provider.name + '</strong><span>' + status + '</span></a>';
      }).join('') + '</div>';
  }
  document.addEventListener('shellz:finder-result', function(event){ render(event.detail); });
  document.addEventListener('shellz:data-ready', function(){ if(window.SHELLZ_FINDER_RESULT) render(window.SHELLZ_FINDER_RESULT); });
  if(window.SHELLZ_FINDER_RESULT) render(window.SHELLZ_FINDER_RESULT);
})();
