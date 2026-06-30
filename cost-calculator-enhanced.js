// Shellz enhanced Website Cost Calculator - 2026-06-26
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var form = document.getElementById('hosting-cost-calculator');
    if (!form) return;

    var presets = {
      under25: { websiteType: 'learning', hostingType: 'shared', budgetLimit: '25', billingMonths: '12', domainNeeded: 'yes', emailNeeded: 'no', introPrice: '0.99', renewalPrice: '7.99', domainCost: '12.00', emailCost: '0.00', addonCost: '0.00' },
      blog: { websiteType: 'blog', hostingType: 'wordpress', budgetLimit: '50', billingMonths: '12', domainNeeded: 'yes', emailNeeded: 'no', introPrice: '2.99', renewalPrice: '8.99', domainCost: '0.00', emailCost: '0.00', addonCost: '0.00' },
      business: { websiteType: 'business', hostingType: 'wordpress', budgetLimit: '100', billingMonths: '12', domainNeeded: 'yes', emailNeeded: 'basic', introPrice: '3.99', renewalPrice: '11.99', domainCost: '0.00', emailCost: '12.00', addonCost: '12.00' },
      affiliate: { websiteType: 'affiliate', hostingType: 'wordpress', budgetLimit: '100', billingMonths: '12', domainNeeded: 'yes', emailNeeded: 'no', introPrice: '2.99', renewalPrice: '9.99', domainCost: '12.00', emailCost: '0.00', addonCost: '24.00' }
    };

    function el(id) { return document.getElementById(id); }
    function number(id) {
      var field = el(id);
      var value = field ? parseFloat(String(field.value || '0').replace(/,/g, '')) : 0;
      return isNaN(value) || value < 0 ? 0 : value;
    }
    function value(id) { var field = el(id); return field ? String(field.value || '') : ''; }
    function set(id, text) { var node = el(id); if (node) node.textContent = text; }
    function money(value) {
      return '$' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function setClass(node, cls) {
      if (!node) return;
      node.classList.remove('good', 'warn', 'danger');
      if (cls) node.classList.add(cls);
    }

    function calculate() {
      var intro = number('introPrice');
      var renewal = number('renewalPrice');
      var months = Math.max(1, Math.round(number('billingMonths') || 12));
      var domain = number('domainCost');
      var email = number('emailCost');
      var addon = number('addonCost');
      var budget = Math.max(1, number('budgetLimit') || 25);
      var type = value('websiteType');
      var hostingType = value('hostingType');

      var firstTerm = (intro * months) + domain + email + addon;
      var renewalTerm = (renewal * months) + domain + email + addon;
      var twoTerm = firstTerm + renewalTerm;
      var increase = firstTerm > 0 ? ((renewalTerm - firstTerm) / firstTerm) * 100 : 0;
      var increaseText = (increase > 0 ? '+' : '') + increase.toFixed(1) + '%';

      set('firstYearCost', money(firstTerm));
      set('renewalYearCost', money(renewalTerm));
      set('twoYearCost', money(twoTerm));
      set('renewalIncrease', increaseText);

      var summary = el('calcSummary');
      var warning = el('calcWarning');
      var recommendation = el('recommendationText');
      var avoid = el('avoidList');

      if (summary) {
        if (firstTerm <= budget) summary.textContent = 'This setup fits your selected first-year budget';
        else summary.textContent = 'This setup is above your selected first-year budget';
      }

      if (warning) {
        if (increase >= 150) {
          warning.textContent = 'High renewal warning: your next billing term may be much higher than the first bill. Compare renewal before choosing this deal.';
          setClass(warning, 'danger');
        } else if (renewalTerm > firstTerm) {
          warning.textContent = 'Renewal warning: this setup may become more expensive after the first term. Save the renewal price before paying.';
          setClass(warning, 'warn');
        } else {
          warning.textContent = 'Good sign: your renewal estimate is not higher than the first bill, but still verify the provider checkout page.';
          setClass(warning, 'good');
        }
      }

      if (recommendation) {
        if (firstTerm > budget && hostingType !== 'static') {
          recommendation.textContent = 'To stay closer to your budget, remove paid add-ons first, delay paid email, or compare a simpler beginner hosting plan.';
        } else if (type === 'business') {
          recommendation.textContent = 'For a business website, prioritize reliable hosting, SSL, a clear domain renewal price, and a simple contact page before buying extras.';
        } else if (type === 'affiliate') {
          recommendation.textContent = 'For an affiliate website, keep the first setup lean. Spend time on useful content and compare renewal costs before committing long term.';
        } else if (hostingType === 'static') {
          recommendation.textContent = 'A static/free hosting route can be very cheap, but it is best for simple pages, portfolios, and learning projects.';
        } else {
          recommendation.textContent = 'This can be a reasonable beginner setup if the provider checkout confirms the same total and renewal terms.';
        }
      }

      if (avoid) {
        var items = [
          'Skip checkout add-ons you do not understand yet.',
          'Check whether SSL and backups are included before paying extra.',
          'Save the renewal price, login URL, and billing date after purchase.'
        ];
        if (email > 0) items.push('Confirm whether email renews separately from hosting.');
        if (domain > 0) items.push('Check the domain renewal price, not only the first-year domain cost.');
        avoid.innerHTML = items.map(function (item) { return '<span>' + item + '</span>'; }).join('');
      }
    }

    document.querySelectorAll('.cost-preset').forEach(function (button) {
      button.addEventListener('click', function () {
        var preset = presets[button.getAttribute('data-preset')];
        if (!preset) return;
        Object.keys(preset).forEach(function (id) {
          var field = el(id);
          if (field) field.value = preset[id];
        });
        calculate();
      });
    });

    var domainSelect = el('domainNeeded');
    if (domainSelect) {
      domainSelect.addEventListener('change', function () {
        var domainCost = el('domainCost');
        if (domainCost) domainCost.value = domainSelect.value === 'yes' ? '12.00' : '0.00';
        calculate();
      });
    }
    var emailSelect = el('emailNeeded');
    if (emailSelect) {
      emailSelect.addEventListener('change', function () {
        var emailCost = el('emailCost');
        if (emailCost) {
          emailCost.value = emailSelect.value === 'paid' ? '60.00' : (emailSelect.value === 'basic' ? '12.00' : '0.00');
        }
        calculate();
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      calculate();
    });

    ['websiteType','hostingType','budgetLimit','domainNeeded','emailNeeded','introPrice','renewalPrice','billingMonths','domainCost','emailCost','addonCost'].forEach(function (id) {
      var field = el(id);
      if (field) {
        field.addEventListener('input', calculate);
        field.addEventListener('change', calculate);
      }
    });

    calculate();
  });
})();
