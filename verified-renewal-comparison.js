(function(){
  'use strict';
  function money(value){ return value == null || isNaN(Number(value)) ? 'Not available' : '$' + Number(value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function monthly(value){ return value == null || isNaN(Number(value)) ? 'Not available' : '$' + Number(value).toFixed(2) + '/mo'; }
  function percent(value){ return value == null || isNaN(Number(value)) ? 'Not calculated' : (Number(value) >= 0 ? '+' : '') + Number(value).toFixed(1) + '%'; }
  function esc(value){ return String(value == null ? '' : value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function evidenceBadge(row){
    var type=row.renewal_evidence_type||'public-research';
    var label=row.renewal_evidence_label||type.replace(/-/g,' ');
    return '<span class="renewal-proof-badge renewal-proof-'+esc(type)+'">'+esc(label)+'</span>';
  }
  function proofLink(row){
    var href=row.evidencePage||row.reviewUrl||'#';
    return '<a class="details-link" href="'+esc(href)+'">View proof</a>';
  }
  function rowsFor(group){
    var plans=(window.SHELLZ_DATA&&window.SHELLZ_DATA.pricing&&window.SHELLZ_DATA.pricing.plans)||{};
    return Object.keys(plans).map(function(key){var row=plans[key]; row._key=key; return row;})
      .filter(function(row){return row.comparison_primary && row.comparison_group===group;})
      .sort(function(a,b){return (a.comparison_order||99)-(b.comparison_order||99);});
  }
  function renderTwelve(rows){
    var body=document.getElementById('verifiedTwelveMonthBody'); if(!body)return;
    body.innerHTML=rows.map(function(r){
      var nextInvoice=r.renewal_invoice_total==null?'Term not visible':money(r.renewal_invoice_total);
      return '<tr><td><strong>'+esc(r.provider)+'</strong><small>'+esc(r.plan)+'</small></td><td>'+esc(r.upfront_term_months)+' months</td><td><strong>'+money(r.first_invoice_total)+'</strong><small>'+monthly(r.effective_intro_monthly)+' effective</small></td><td>'+monthly(r.renewal_monthly_equivalent)+'</td><td>'+nextInvoice+'</td><td><strong>'+percent(r.renewal_increase_percent)+'</strong><small>monthly-equivalent increase</small></td><td>'+evidenceBadge(r)+'</td><td>'+proofLink(r)+'</td></tr>';
    }).join('');
  }
  function renderLong(rows){
    var body=document.getElementById('verifiedLongTermBody'); if(!body)return;
    body.innerHTML=rows.map(function(r){
      return '<tr><td><strong>'+esc(r.provider)+'</strong><small>'+esc(r.plan)+'</small></td><td>'+esc(r.upfront_term_months)+' months</td><td><strong>'+money(r.first_invoice_total)+'</strong><small>'+monthly(r.effective_intro_monthly)+' effective</small></td><td>'+esc(r.renewalLabel||'Not captured')+'</td><td>'+percent(r.renewal_increase_percent)+'</td><td>'+evidenceBadge(r)+'</td><td>'+proofLink(r)+'</td></tr>';
    }).join('');
  }
  function renderMonthly(rows){
    var body=document.getElementById('verifiedMonthlyCouponBody'); if(!body)return;
    body.innerHTML=rows.map(function(r){
      var coupon=(r.couponApplied===false?'SAVE79 rejected':(r.firstTermCouponCodes&&r.firstTermCouponCodes.length?r.firstTermCouponCodes.join(', '):(r.couponLabel||'Automatic offer')));
      return '<tr><td><strong>'+esc(r.provider)+'</strong><small>'+esc(r.plan)+'</small></td><td>'+esc(r.upfront_term_months)+' month'+(r.upfront_term_months===1?'':'s')+'</td><td>'+esc(coupon)+'</td><td><strong>'+money(r.first_invoice_total)+'</strong></td><td>'+money(r.renewal_invoice_total)+'</td><td>'+percent(r.renewal_increase_percent)+'</td><td>'+evidenceBadge(r)+'</td><td>'+proofLink(r)+'</td></tr>';
    }).join('');
  }
  function renderSummary(twelve,monthlyRows){
    var summary=document.getElementById('verifiedRenewalSummary'); if(!summary)return;
    if(!twelve.length)return;
    var minFirst=Math.min.apply(null,twelve.map(function(r){return Number(r.first_invoice_total);}));
    var minFirstRows=twelve.filter(function(r){return Number(r.first_invoice_total)===minFirst;});
    var confirmed=twelve.filter(function(r){return r.renewal_evidence_type==='confirmed-cart-line' && r.renewal_monthly_equivalent!=null;});
    var lowestConfirmed=confirmed.sort(function(a,b){return a.renewal_monthly_equivalent-b.renewal_monthly_equivalent;})[0];
    var largest=twelve.filter(function(r){return r.renewal_increase_percent!=null;}).sort(function(a,b){return b.renewal_increase_percent-a.renewal_increase_percent;})[0];
    var monthlyRow=monthlyRows.filter(function(r){return r.upfront_term_months===1;})[0];
    var firstNames=minFirstRows.map(function(r){return r.provider;}).join(' and ');
    summary.innerHTML=
      '<article><span>Lowest captured 12-month first invoice</span><strong>'+money(minFirst)+'</strong><p>'+esc(firstNames)+' tie in the captured examples. This is not a provider-wide price guarantee.</p></article>'+
      '<article><span>Lowest confirmed 12-month renewal line</span><strong>'+(lowestConfirmed?monthly(lowestConfirmed.renewal_monthly_equivalent):'Not available')+'</strong><p>'+(lowestConfirmed?esc(lowestConfirmed.provider+' '+lowestConfirmed.plan):'No confirmed equal-term row')+'. Estimated regular-price rows are kept separate.</p></article>'+
      '<article><span>Largest captured monthly-equivalent jump</span><strong>'+(largest?percent(largest.renewal_increase_percent):'Not calculated')+'</strong><p>'+(largest?esc(largest.provider+' '+largest.plan):'No row')+'. This compares effective intro monthly cost with the displayed renewal monthly equivalent.</p></article>'+
      '<article><span>Lowest upfront commitment</span><strong>'+(monthlyRow?money(monthlyRow.first_invoice_total):'Not available')+'</strong><p>'+(monthlyRow?esc(monthlyRow.provider+' monthly plan; next charge '+money(monthlyRow.renewal_invoice_total)):'No monthly capture')+'. Lower commitment does not mean lower long-term cost.</p></article>';
  }
  function render(){
    if(!window.SHELLZ_DATA)return;
    var twelve=rowsFor('twelve-month'), longRows=rowsFor('long-prepaid'), monthlyRows=rowsFor('monthly-coupon');
    renderSummary(twelve,monthlyRows); renderTwelve(twelve); renderLong(longRows); renderMonthly(monthlyRows);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
  document.addEventListener('shellz:data-ready',render);
})();
