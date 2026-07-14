(function(){
  function yes(value){ return value ? 'Published' : 'Missing'; }
  function render(){
    if(!window.SHELLZ_DATA) return;
    var data = window.SHELLZ_DATA;
    var providers = data.providers.providers || {};
    var plans = data.pricing.plans || {};
    var evidence = data.evidence.providers || {};
    var coupons = data.coupons.checks || {};
    var body = document.getElementById('dataStatusBody');
    var summary = document.getElementById('dataStatusSummary');
    var priority = document.getElementById('dataStatusPriority');
    if(summary) summary.innerHTML = '<span><strong>' + Object.keys(providers).length + '</strong> providers</span><span><strong>' + Object.keys(plans).length + '</strong> exact-plan rows</span><span><strong>' + Object.keys(coupons).length + '</strong> coupon/deal checks</span><span><strong>' + Object.keys(evidence).filter(function(k){return evidence[k].checkout&&evidence[k].checkout.published;}).length + '</strong> checkout captures</span>';
    if(body) body.innerHTML = Object.keys(providers).map(function(key){
      var p = providers[key], e = evidence[key] || {};
      var planCount = Object.keys(plans).filter(function(k){return plans[k].provider_key===key;}).length;
      var couponCount = Object.keys(coupons).filter(function(k){return coupons[k].provider_key===key;}).length;
      var renewal = e.renewal && e.renewal.status ? e.renewal.status.replace(/-/g,' ') : 'not structured';
      return '<tr><td><strong>' + p.name + '</strong></td><td>' + (planCount ? planCount + ' row' + (planCount>1?'s':'') : 'Missing') + '</td><td>' + renewal + '</td><td>' + (couponCount ? couponCount + ' page/check' + (couponCount>1?'s':'') : 'Missing') + '</td><td>' + yes(e.checkout&&e.checkout.published) + '</td><td>' + yes(e.speed&&e.speed.published) + '</td><td>' + yes(e.uptime&&e.uptime.published) + '</td><td>' + yes(e.support&&e.support.published) + '</td><td>' + (e.next_action || 'Structure next action') + '</td></tr>';
    }).join('');
    if(priority){
      var candidates = Object.keys(evidence).filter(function(k){ var e=evidence[k]; return e.next_action && !(e.checkout&&e.checkout.published); });
      var first = candidates.find(function(k){ return Object.keys(plans).some(function(pk){return plans[pk].provider_key===k;}); }) || candidates[0];
      if(first){ priority.innerHTML = '<strong>Highest practical next evidence task:</strong> ' + providers[first].name + ' — ' + evidence[first].next_action + '.'; }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
  document.addEventListener('shellz:data-ready',render);
})();
