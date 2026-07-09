(function(){
  function render(){
    var body = document.getElementById('renewalTrackerBody');
    if (!body || !window.SHELLZ_DATA) return;
    var plans = window.SHELLZ_DATA.pricing.plans || {};
    body.innerHTML = Object.keys(plans).map(function(key){
      var p = plans[key];
      var cost = p.threeYearCost == null ? 'Not yet calculated' : '$' + Number(p.threeYearCost).toFixed(2);
      var source = p.providerSource ? '<a href="' + p.providerSource + '" rel="nofollow noopener noreferrer" target="_blank">Provider source</a>' : 'Source not structured';
      var review = p.reviewUrl ? ' · <a href="' + p.reviewUrl + '">Shellz review</a>' : '';
      return '<tr data-plan-key="' + key + '">' +
        '<td><strong>' + p.provider + ' ' + p.plan + '</strong></td>' +
        '<td>' + p.regionCurrency + '</td>' +
        '<td>' + p.introLabel + '<small class="data-term-note">' + p.introTerm + '</small></td>' +
        '<td>' + p.renewalLabel + '<small class="data-term-note">' + p.renewalTerm + '</small></td>' +
        '<td>' + p.lastChecked + '</td><td>' + p.status + '</td><td>' + cost + '</td><td>' + source + review + '</td></tr>';
    }).join('');
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
  document.addEventListener('shellz:data-ready', render);
})();
