/* Shellz 2026 Redesign — progressive enhancement
   1) Mobile-stacked comparison tables: copies each <th> label onto its <td>
      via data-label, CSS turns rows into cards under 720px.
   2) CTA click tracking: forwards .sz-cta clicks to dataLayer / gtag,
      mirroring the existing shellz-track-cta convention.
*/
(function(){
  function labelTables(){
    document.querySelectorAll('main table, article table, .container table, table.compare, table').forEach(function(tbl){
      if (tbl.dataset.szStacked) return;
      var headRow = tbl.querySelector('thead tr') || tbl.querySelector('tr');
      if (!headRow) return;
      var heads = Array.prototype.map.call(headRow.children, function(c){ return (c.textContent||'').trim(); });
      if (heads.length < 2) return;
      tbl.classList.add('sz-stack-table');
      tbl.querySelectorAll('tbody tr, tr').forEach(function(tr){
        if (tr === headRow) return;
        Array.prototype.forEach.call(tr.children, function(td, i){
          if (td.tagName === 'TH') return;
          if (!td.getAttribute('data-label') && heads[i]) td.setAttribute('data-label', heads[i]);
        });
      });
      tbl.dataset.szStacked = '1';
    });
  }

  function trackCtas(){
    document.addEventListener('click', function(e){
      var a = e.target.closest('a.sz-cta');
      if (!a) return;
      var payload = {
        event: 'cta_click',
        cta_label: (a.textContent||'').trim().slice(0,80),
        cta_href: a.getAttribute('href') || '',
        cta_page: location.pathname,
        cta_source: 'sz-cta'
      };
      try { (window.dataLayer = window.dataLayer || []).push(payload); } catch(_){}
      if (typeof window.gtag === 'function') {
        try { window.gtag('event', 'cta_click', payload); } catch(_){}
      }
    }, {passive:true});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ labelTables(); trackCtas(); });
  } else {
    labelTables(); trackCtas();
  }
})();
