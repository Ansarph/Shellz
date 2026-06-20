// Shellz.com site interactions
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // Footer year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Deal-card filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.deal-card');

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';

        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        cards.forEach((card) => {
          const categories = card.dataset.category || '';
          const shouldShow = filter === 'all' || categories.includes(filter);
          card.style.display = shouldShow ? 'grid' : 'none';
        });
      });
    });

    // Legacy coupon copy buttons
    document.querySelectorAll('.coupon-code').forEach((button) => {
      button.addEventListener('click', async () => {
        const originalText = button.textContent;
        const copyText = button.dataset.copy || originalText;

        if (/no public code|required|check current|use current|get deal/i.test(copyText)) {
          button.textContent = 'Check official deal';
          setTimeout(() => { button.textContent = originalText; }, 1400);
          return;
        }

        try {
          await navigator.clipboard.writeText(copyText);
          button.textContent = 'Copied!';
          setTimeout(() => { button.textContent = originalText; }, 1400);
        } catch (error) {
          button.textContent = 'Copy manually';
          setTimeout(() => { button.textContent = originalText; }, 1400);
        }
      });
    });

    function trackAffiliateClick(provider, placement, url) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'affiliate_click', {
          provider: provider,
          placement: placement,
          link_url: url
        });
      }

      try {
        const key = 'shellz_affiliate_clicks';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ provider, placement, url, time: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing.slice(-100)));
      } catch (error) {
        // Local storage is optional. Ignore if unavailable.
      }
    }

    // Affiliate click tracking
    document.querySelectorAll('a[rel~="sponsored"], .affiliate-link').forEach((link) => {
      link.addEventListener('click', () => {
        const provider = link.dataset.provider || link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
        const placement = link.dataset.placement || document.title;
        trackAffiliateClick(provider, placement, link.href);
      });
    });

    // Coupon reveal modal
    let backdrop = null;
    let activeCode = '';

    function ensureCouponModal() {
      if (backdrop) return backdrop;

      backdrop = document.createElement('div');
      backdrop.className = 'coupon-modal-backdrop';
      backdrop.innerHTML = `
        <div class="coupon-modal" role="dialog" aria-modal="true" aria-labelledby="coupon-modal-title">
          <div class="coupon-modal-head">
            <p id="coupon-modal-provider">Shellz coupon</p>
            <h2 id="coupon-modal-title">Coupon code</h2>
            <button class="coupon-modal-close" type="button" aria-label="Close coupon popup">×</button>
          </div>
          <div class="coupon-modal-body">
            <p class="coupon-modal-note" id="coupon-modal-note">Copy the code, then open the provider and apply it at checkout.</p>
            <div class="revealed-code-box">
              <div class="revealed-code" id="revealed-code">CODE</div>
              <button class="copy-modal-code" type="button">Copy</button>
            </div>
            <div class="coupon-modal-actions">
              <a class="btn primary" id="coupon-visit-link" href="#" target="_blank" rel="sponsored nofollow noopener noreferrer">Visit site</a>
              <a class="btn secondary" id="coupon-review-link" href="#">Read review</a>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(backdrop);

      const closeBtn = backdrop.querySelector('.coupon-modal-close');
      const copyBtn = backdrop.querySelector('.copy-modal-code');

      function closeModal() {
        backdrop.classList.remove('active');
        document.body.classList.remove('coupon-modal-open');
      }

      closeBtn.addEventListener('click', closeModal);

      backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) closeModal();
      });

      copyBtn.addEventListener('click', async () => {
        if (!activeCode) return;
        try {
          await navigator.clipboard.writeText(activeCode);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
        } catch (error) {
          copyBtn.textContent = 'Copy manually';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && backdrop.classList.contains('active')) {
          closeModal();
        }
      });

      return backdrop;
    }

    function openCouponModal(button) {
      const modal = ensureCouponModal();

      const provider = button.dataset.provider || 'Provider';
      const title = button.dataset.title || 'Coupon code';
      const code = button.dataset.code || '';
      const url = button.dataset.url || button.getAttribute('href') || '#';
      const review = button.dataset.review || 'reviews.html';
      const realCode = String(button.dataset.realCode || '').toLowerCase() === 'true';

      // For "Get Deal" cards, open the provider directly.
      if (!realCode) {
        trackAffiliateClick(provider, title || document.title, url);
        if (url && url !== '#') {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
        return;
      }

      activeCode = code;

      modal.querySelector('#coupon-modal-provider').textContent = provider;
      modal.querySelector('#coupon-modal-title').textContent = title;
      modal.querySelector('#revealed-code').textContent = code || 'Check deal';
      modal.querySelector('#coupon-visit-link').href = url || '#';
      modal.querySelector('#coupon-review-link').href = review || 'reviews.html';
      modal.querySelector('#coupon-modal-note').textContent = 'Copy this code, open the provider in a new tab, and apply it at checkout. Verify the final total before buying.';
      modal.querySelector('.copy-modal-code').style.display = '';
      modal.querySelector('.copy-modal-code').textContent = 'Copy';

      trackAffiliateClick(provider, 'coupon_reveal_' + title, url);

      modal.classList.add('active');
      document.body.classList.add('coupon-modal-open');
      modal.querySelector('.coupon-modal-close').focus();
    }

    // Delegated listener works for every current and future coupon card.
    document.addEventListener('click', (event) => {
      const button = event.target.closest('.show-code-btn');
      if (!button) return;
      event.preventDefault();
      openCouponModal(button);
    });
  });
})();
// Shellz Quick Tools copy-link button
(function () {
  function copyIconMarkup(label) {
    return '' +
      '<span class="qt-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<path d="M10.59 13.41a.75.75 0 0 1 0-1.06l3.76-3.76a3 3 0 1 1 4.24 4.24l-2.82 2.83a3 3 0 0 1-4.24 0 .75.75 0 1 1 1.06-1.06 1.5 1.5 0 0 0 2.12 0l2.82-2.82a1.5 1.5 0 1 0-2.12-2.12l-3.76 3.76a.75.75 0 0 1-1.06 0Z"></path>' +
          '<path d="M13.41 10.59a.75.75 0 0 1 0 1.06l-3.76 3.76a3 3 0 1 1-4.24-4.24l2.82-2.83a3 3 0 0 1 4.24 0 .75.75 0 1 1-1.06 1.06 1.5 1.5 0 0 0-2.12 0L6.47 12.22a1.5 1.5 0 1 0 2.12 2.12l3.76-3.76a.75.75 0 0 1 1.06 0Z"></path>' +
        '</svg>' +
      '</span>' +
      '<span class="sr-only">' + label + '</span>';
  }

  function setCopiedState(button, copied) {
    if (!button || !copied) return;

    var sr = button.querySelector('.sr-only');
    var originalLabel = (sr && sr.textContent) ? sr.textContent : 'Copy link';

    button.classList.add('copied');
    button.setAttribute('aria-label', 'Copied');
    button.setAttribute('title', 'Copied');
    button.textContent = 'Copied';

    window.setTimeout(function () {
      button.classList.remove('copied');
      button.setAttribute('aria-label', originalLabel);
      button.setAttribute('title', originalLabel);
      button.innerHTML = copyIconMarkup(originalLabel);
    }, 1800);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-copy-link]');
    if (!button) return;

    var url = button.getAttribute('data-copy-url') || window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        setCopiedState(button, true);
      }).catch(function () {
        window.prompt('Copy this link:', url);
      });
    } else {
      window.prompt('Copy this link:', url);
    }
  });
})();
// Shellz CTA tracking-ready attributes
(function () {
  document.addEventListener('click', function (event) {
    var link = event.target.closest('.shellz-track-cta');
    if (!link) return;

    var payload = {
      event: 'shellz_cta_click',
      cta: link.getAttribute('data-cta') || 'cta-click',
      provider: link.getAttribute('data-provider') || 'unknown',
      pageType: link.getAttribute('data-page-type') || 'unknown',
      offerType: link.getAttribute('data-offer-type') || 'unknown',
      href: link.getAttribute('href') || '',
      page: window.location.pathname
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    if (window.gtag) {
      window.gtag('event', 'shellz_cta_click', {
        cta: payload.cta,
        provider: payload.provider,
        page_type: payload.pageType,
        offer_type: payload.offerType,
        link_url: payload.href
      });
    }
  });
})();


// SHELLZ CRO AUDIT FINAL: single safe mobile nav + body state 20260619
(function(){
  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function(){
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-navigation');
    if(!toggle || !nav) return;

    nav.setAttribute('data-mobile-nav-ready','true');

    function closeNav(){
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Open menu');
    }
    function openNav(){
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded','true');
      toggle.setAttribute('aria-label','Close menu');
    }
    function isDesktop(){ return window.matchMedia('(min-width: 761px)').matches; }

    closeNav();

    toggle.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      if(isDesktop()) return;
      document.body.classList.contains('nav-open') ? closeNav() : openNav();
    });

    nav.addEventListener('click', function(e){
      if(e.target.closest('a')) closeNav();
    });

    document.addEventListener('click', function(e){
      if(!document.body.classList.contains('nav-open')) return;
      if(e.target.closest('.site-header')) return;
      closeNav();
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function(){
      if(isDesktop()) closeNav();
    }, {passive:true});
  });
})();




// SHELLZ CALCULATOR FIX: robust hosting cost calculator 20260620
(function(){
  function ready(fn){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function(){
    var form = document.getElementById('hosting-cost-calculator');
    if(!form) return;

    function getNumber(id){
      var el = document.getElementById(id);
      if(!el) return 0;
      var raw = String(el.value || '').replace(/,/g, '').trim();
      var num = parseFloat(raw);
      return isNaN(num) || num < 0 ? 0 : num;
    }

    function money(value){
      return '$' + Number(value || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function setText(id, value){
      var el = document.getElementById(id);
      if(el) el.textContent = value;
    }

    function calculateHostingCost(){
      var intro = getNumber('introPrice');
      var renewalMonthly = getNumber('renewalPrice');
      var months = Math.max(1, Math.round(getNumber('billingMonths') || 1));
      var domain = getNumber('domainCost');
      var email = getNumber('emailCost');
      var addon = getNumber('addonCost');

      var firstTerm = (intro * months) + domain + email + addon;
      var renewalTerm = (renewalMonthly * months) + domain + email + addon;
      var increase = firstTerm > 0 ? ((renewalTerm - firstTerm) / firstTerm) * 100 : 0;
      var savingsLost = renewalTerm - firstTerm;

      // Support both old and new possible result IDs.
      setText('firstYearCost', money(firstTerm));
      setText('firstTermCost', money(firstTerm));
      setText('totalFirstCost', money(firstTerm));
      setText('renewalYearCost', money(renewalTerm));
      setText('renewalTermCost', money(renewalTerm));
      setText('renewalIncrease', (increase > 0 ? '+' : '') + increase.toFixed(1) + '%');

      var summary = document.getElementById('calcSummary');
      if(summary){
        if(renewalTerm > firstTerm){
          summary.textContent = 'Renewal may cost ' + money(savingsLost) + ' more than the first term';
        } else if(renewalTerm < firstTerm){
          summary.textContent = 'Renewal estimate is lower than the first term';
        } else {
          summary.textContent = 'Renewal estimate is the same as the first term';
        }
      }

      var warning = document.getElementById('calcWarning');
      if(warning){
        warning.textContent = renewalTerm > firstTerm
          ? 'Warning: the renewal bill is higher. Check the provider checkout and renewal terms before choosing a long billing period.'
          : 'Still verify the provider checkout total, renewal terms, taxes, and add-ons before payment.';
      }
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      calculateHostingCost();
    });

    ['introPrice','renewalPrice','billingMonths','domainCost','emailCost','addonCost'].forEach(function(id){
      var el = document.getElementById(id);
      if(el){
        el.addEventListener('input', calculateHostingCost);
        el.addEventListener('change', calculateHostingCost);
      }
    });

    calculateHostingCost();
  });
})();

