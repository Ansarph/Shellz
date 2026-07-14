(function(){
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function isInternal(url){return url && !/^https?:\/\//i.test(url);}
  function evidenceRank(p){var s=p.evidenceStatus||'';if(s.indexOf('shellz-checkout')===0)return 0;if(s.indexOf('public-pricing')===0)return 1;return 2;}
  function render(){
    var body=document.getElementById('renewalTrackerBody');
    if(!body||!window.SHELLZ_DATA)return;
    var plans=window.SHELLZ_DATA.pricing.plans||{};
    var rows=Object.keys(plans).map(function(key){var p=plans[key];p._key=key;return p;}).sort(function(a,b){var r=evidenceRank(a)-evidenceRank(b);if(r)return r;return String(a.provider).localeCompare(String(b.provider));});
    body.innerHTML=rows.map(function(p){
      var cost=p.threeYearCost==null?'Not yet calculated':'$'+Number(p.threeYearCost).toFixed(2);
      var source='Source not structured';
      if(p.evidencePage) source='<a href="'+esc(p.evidencePage)+'">Evidence page</a>';
      else if(p.providerSource) source=isInternal(p.providerSource)?'<a href="'+esc(p.providerSource)+'">Source</a>':'<a href="'+esc(p.providerSource)+'" rel="nofollow noopener noreferrer" target="_blank">Provider source</a>';
      var review=p.reviewUrl?' · <a href="'+esc(p.reviewUrl)+'">Shellz review</a>':'';
      var calc=p.renewal_increase_percent==null?'':'<small class="data-term-note">Monthly-equivalent increase: '+(p.renewal_increase_percent>=0?'+':'')+Number(p.renewal_increase_percent).toFixed(1)+'%</small>';
      return '<tr data-plan-key="'+esc(p._key)+'"><td><strong>'+esc(p.provider+' '+p.plan)+'</strong></td><td>'+esc(p.regionCurrency)+'</td><td>'+esc(p.introLabel)+'<small class="data-term-note">'+esc(p.introTerm)+'</small></td><td>'+esc(p.renewalLabel)+'<small class="data-term-note">'+esc(p.renewalTerm)+'</small>'+calc+'</td><td>'+esc(p.lastChecked)+'</td><td>'+esc(p.status)+'</td><td>'+cost+'</td><td>'+source+review+'</td></tr>';
    }).join('');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
  document.addEventListener('shellz:data-ready',render);
})();
