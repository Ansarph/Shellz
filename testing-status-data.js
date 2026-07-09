(function(){
  function published(value){ return value && value.published ? 'Published' : 'Not published'; }
  function render(){
    var body = document.getElementById('evidenceStatusBody');
    if (!body || !window.SHELLZ_DATA) return;
    var providers = window.SHELLZ_DATA.providers.providers || {};
    var evidence = window.SHELLZ_DATA.evidence.providers || {};
    var rows = Object.keys(evidence).filter(function(key){ return evidence[key].public_status; })
      .sort(function(a,b){ return (evidence[a].public_order||99) - (evidence[b].public_order||99); });
    body.innerHTML = rows.map(function(key){
      var e = evidence[key], p = providers[key] || {name:key, review_url:'#'};
      var couponText = e.publicSummary || ((e.coupon && e.coupon.page_published) ? 'Coupon/deal research page published' : 'No coupon page structured');
      var renewalText = e.renewal && e.renewal.status ? e.renewal.status.replace(/-/g,' ') : 'Not structured';
      var performance = 'Speed: ' + published(e.speed) + ' · Uptime: ' + published(e.uptime) + ' · Support: ' + published(e.support);
      return '<tr><td><strong>' + p.name + '</strong></td><td>' + couponText + '<small class="data-term-note">' + (e.checkoutLabel || ('Checkout: ' + published(e.checkout))) + '</small></td><td>' + renewalText + '</td><td>' + performance + '</td><td>' + e.next_action + '</td><td><a href="' + p.review_url + '">Read</a></td></tr>';
    }).join('');
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
  document.addEventListener('shellz:data-ready', render);
})();
