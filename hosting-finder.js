(function () {
  'use strict';

  const form = document.getElementById('hostingFinderForm');
  const result = document.getElementById('finderResult');
  if (!form || !result) return;

  const titleEl = document.getElementById('finderResultTitle');
  const summaryEl = document.getElementById('finderResultSummary');
  const strengthEl = document.getElementById('finderMatchStrength');
  const answersEl = document.getElementById('finderAnswerSummary');
  const reasonEl = document.getElementById('finderReason');
  const watchEl = document.getElementById('finderWatch');
  const alternativeEl = document.getElementById('finderAlternative');
  const linksEl = document.getElementById('finderResultLinks');
  const resetButton = document.getElementById('finderReset');

  const profiles = {
    budget: {
      title: 'Budget shared hosting',
      summary: 'Start with a simple shared hosting plan, but judge it by the total first bill and the renewal term—not the headline monthly price.',
      watch: 'Check the exact amount due today, renewal amount and term, backup limits, email cost, domain renewal, refund exclusions, and preselected add-ons.',
      links: [
        ['1. Compare the category', 'Best Cheap Web Hosting', 'best-cheap-web-hosting.html'],
        ['2. Check the second bill', 'Renewal Price Tracker', 'hosting-renewal-price-database.html'],
        ['3. Check the deal last', 'Hosting Coupon Checks', 'promo-codes.html']
      ]
    },
    shared: {
      title: 'Beginner shared or WordPress hosting',
      summary: 'A beginner-friendly shared or WordPress plan is the closest fit when easy setup and a normal website matter more than server control.',
      watch: 'Check renewal pricing, automatic backup rules, email cost, migration help, SSL, support scope, and whether the cheapest plan excludes tools you need.',
      links: [
        ['1. Compare the category', 'Best Hosting for Beginners', 'best-hosting-for-beginners.html'],
        ['2. Compare real cost', 'Hosting Cost Calculator', 'hosting-cost-calculator.html'],
        ['3. Use the checklist', "Hosting Buyer's Checklist", 'hosting-buyers-checklist.html']
      ]
    },
    wordpress: {
      title: 'WordPress-focused hosting',
      summary: 'WordPress-focused hosting is the closest fit when easier setup, caching, backups, staging, and WordPress-oriented support can save you time.',
      watch: 'Check the exact renewal term, backup retention, staging limits, migration policy, email cost, plugin restrictions, and whether support covers WordPress issues.',
      links: [
        ['1. Compare the category', 'Best WordPress Hosting', 'best-wordpress-hosting.html'],
        ['2. Compare two common paths', 'Hostinger vs Bluehost', 'hostinger-vs-bluehost.html'],
        ['3. Check the second bill', 'Renewal Price Tracker', 'hosting-renewal-price-database.html']
      ]
    },
    ecommerce: {
      title: 'Ecommerce-ready WordPress or managed hosting',
      summary: 'An online store needs a safer performance and support path than the cheapest starter plan. Prioritize backups, SSL, restore options, support, and room to grow.',
      watch: 'Check resource limits, backup and restore rules, staging, payment-stack compatibility, support scope, renewal pricing, and what happens when traffic grows.',
      links: [
        ['1. Start with store needs', 'Ecommerce Hosting Guide', 'ecommerce-hosting.html'],
        ['2. Compare WordPress options', 'Best WordPress Hosting', 'best-wordpress-hosting.html'],
        ['3. Check before checkout', "Hosting Buyer's Checklist", 'hosting-buyers-checklist.html']
      ]
    },
    managed: {
      title: 'Managed WordPress hosting',
      summary: 'Managed WordPress is the closest fit when performance tools, backups, support, and less technical maintenance matter more than the lowest first bill.',
      watch: 'Check visitor or resource limits, overage rules, backup retention, plugin restrictions, email availability, support scope, and the full renewal or monthly cost.',
      links: [
        ['1. Understand the category', 'Managed WordPress Hosting', 'managed-wordpress-hosting.html'],
        ['2. Compare premium paths', 'Kinsta vs Rocket.net vs Cloudways', 'kinsta-vs-rocket-net-vs-cloudways.html'],
        ['3. Check total cost', 'Hosting Cost Calculator', 'hosting-cost-calculator.html']
      ]
    },
    cloud: {
      title: 'Managed cloud hosting',
      summary: 'Managed cloud hosting is a strong fit when you need more room to scale but do not want to manage a server completely on your own.',
      watch: 'Check how CPU, RAM, storage, bandwidth, backups, support, scaling, and monthly billing are charged. Cloud pricing can be flexible but less predictable.',
      links: [
        ['1. Understand the category', 'Cloud Hosting Guide', 'cloud-hosting.html'],
        ['2. Compare managed options', 'Cloudways vs ScalaHosting', 'cloudways-vs-scalahosting.html'],
        ['3. Check server needs', 'Best VPS Hosting', 'best-vps-hosting.html']
      ]
    },
    vps: {
      title: 'VPS hosting',
      summary: 'VPS hosting is the closest fit when server control, isolated resources, custom software, or developer flexibility matter more than beginner simplicity.',
      watch: 'Check whether the VPS is managed or unmanaged, root access, backup cost, control-panel licensing, security responsibility, scaling, bandwidth, and support scope.',
      links: [
        ['1. Compare the category', 'Best VPS Hosting', 'best-vps-hosting.html'],
        ['2. Compare value paths', 'Contabo vs Hostinger VPS', 'contabo-vs-hostinger-vps.html'],
        ['3. Consider managed cloud', 'Cloud Hosting Guide', 'cloud-hosting.html']
      ]
    },
    domain: {
      title: 'Domain-first or static-site setup',
      summary: 'You may not need to buy a normal hosting plan first. Secure the domain, then compare a static-site, builder, or hosting path separately.',
      watch: 'Check domain renewal, WHOIS privacy, transfer rules, email cost, builder lock-in, custom-domain support, and whether a free hosting path fits your actual site needs.',
      links: [
        ['1. Choose the domain path', 'Best Domain Registrar', 'best-domain-registrar-for-new-website.html'],
        ['2. Compare the building options', 'AI Builder vs WordPress vs GitHub Pages', 'ai-website-builder-vs-wordpress-vs-github-pages.html'],
        ['3. See a low-cost route', 'Start a Website Under $25', 'start-a-website-under-25.html']
      ]
    }
  };

  const labels = {
    project: {
      blog: 'Blog or personal site', business: 'Small business website', store: 'Online store',
      portfolio: 'Portfolio or landing page', traffic: 'Growing or high-traffic site', developer: 'Developer or server project'
    },
    budget: {
      lowest: 'Lowest possible cost', under5: 'Under $5/month intro', balanced: 'Balanced value', performance: 'Performance first'
    },
    skill: {
      beginner: 'Beginner', some: 'Some experience', technical: 'Technical'
    },
    priority: {
      renewal: 'Low renewal price', speed: 'Speed and performance', support: 'Support quality',
      domain: 'Domain setup', vps: 'VPS control', coupon: 'Coupon or deal'
    }
  };

  const weights = {
    project: {
      blog:       {shared:6, wordpress:4, budget:2},
      business:   {wordpress:5, shared:3, managed:3},
      store:      {ecommerce:9, managed:4, wordpress:3},
      portfolio:  {budget:5, shared:4, domain:3},
      traffic:    {managed:6, cloud:6, vps:3, wordpress:2},
      developer:  {vps:9, cloud:5}
    },
    budget: {
      lowest:     {budget:7, shared:3, domain:2, managed:-2, cloud:-1},
      under5:     {budget:6, shared:4, wordpress:2, managed:-2},
      balanced:   {wordpress:4, shared:3, managed:2, cloud:1},
      performance:{managed:6, cloud:5, ecommerce:4, wordpress:3, budget:-2}
    },
    skill: {
      beginner:   {shared:5, wordpress:4, managed:4, budget:2, vps:-6, cloud:-1},
      some:       {wordpress:4, shared:2, managed:3, cloud:2, vps:1},
      technical:  {vps:7, cloud:6, managed:1, shared:-1}
    },
    priority: {
      renewal:    {budget:6, shared:3, domain:1},
      speed:      {managed:6, cloud:5, ecommerce:5, wordpress:3},
      support:    {managed:6, wordpress:5, shared:2, ecommerce:2},
      domain:     {domain:9, budget:2},
      vps:        {vps:10, cloud:4},
      coupon:     {budget:6, shared:3, wordpress:2}
    }
  };

  function getValue(name) {
    const checked = form.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : '';
  }

  function getAnswers() {
    return {
      project: getValue('project'),
      budget: getValue('budget'),
      skill: getValue('skill'),
      priority: getValue('priority')
    };
  }

  function addWeights(scores, group, value) {
    const set = weights[group] && weights[group][value];
    if (!set) return;
    Object.keys(set).forEach(function (key) { scores[key] += set[key]; });
  }

  function calculate(answers) {
    const scores = {budget:0, shared:0, wordpress:0, ecommerce:0, managed:0, cloud:0, vps:0, domain:0};
    Object.keys(answers).forEach(function (group) { addWeights(scores, group, answers[group]); });

    // Guardrails for high-stakes mismatches in the simple scoring model.
    if (answers.project === 'store') scores.ecommerce += 5;
    if (answers.project === 'developer' && answers.skill === 'technical') scores.vps += 4;
    if (answers.project === 'traffic' && answers.skill === 'beginner') scores.managed += 3;
    if (answers.priority === 'vps' && answers.skill === 'beginner') scores.cloud += 2;

    const ranking = Object.keys(scores)
      .map(function (key) { return {key:key, score:scores[key]}; })
      .sort(function (a,b) { return b.score - a.score; });

    return {best:ranking[0], second:ranking[1], ranking:ranking};
  }

  function matchStrength(best, second) {
    const gap = best.score - second.score;
    if (gap >= 6) return 'Strong';
    if (gap >= 3) return 'Good';
    return 'Close call';
  }

  function buildReason(answers) {
    return 'You chose ' + labels.project[answers.project].toLowerCase() + ', ' +
      labels.budget[answers.budget].toLowerCase() + ', ' +
      labels.skill[answers.skill].toLowerCase() + ', with ' +
      labels.priority[answers.priority].toLowerCase() + ' as the main priority. The finder weighs all four answers rather than letting one answer decide the result.';
  }

  function renderAnswerChips(answers) {
    const groups = [
      ['Project', labels.project[answers.project]],
      ['Budget', labels.budget[answers.budget]],
      ['Skill', labels.skill[answers.skill]],
      ['Priority', labels.priority[answers.priority]]
    ];
    answersEl.innerHTML = groups.map(function (item) {
      return '<span class="finder-answer-chip"><strong>' + item[0] + ':</strong>&nbsp;' + item[1] + '</span>';
    }).join('');
  }

  function renderLinks(profile) {
    linksEl.innerHTML = profile.links.map(function (link) {
      return '<a class="finder-result-card" href="' + link[2] + '"><strong>' + link[0] + '</strong><span>' + link[1] + '</span></a>';
    }).join('');
  }

  function renderAlternative(key) {
    const profile = profiles[key];
    alternativeEl.innerHTML = '<span>Also consider</span><strong>' + profile.title + '</strong><p>' + profile.summary + '</p>';
  }

  function updateUrl(answers) {
    const params = new URLSearchParams();
    Object.keys(answers).forEach(function (key) { params.set(key, answers[key]); });
    const next = window.location.pathname + '?' + params.toString() + '#finderResult';
    window.history.replaceState(null, '', next);
  }

  function render(options) {
    const answers = getAnswers();
    const resultData = calculate(answers);
    const profile = profiles[resultData.best.key];
    titleEl.textContent = profile.title;
    summaryEl.textContent = profile.summary;
    strengthEl.textContent = matchStrength(resultData.best, resultData.second);
    reasonEl.textContent = buildReason(answers);
    watchEl.textContent = profile.watch;
    renderAnswerChips(answers);
    renderAlternative(resultData.second.key);
    renderLinks(profile);
    updateUrl(answers);
    if (options && options.scroll) result.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    ['project','budget','skill','priority'].forEach(function (name) {
      const value = params.get(name);
      if (!value) return;
      const input = Array.from(form.querySelectorAll('input[name="' + name + '"]')).find(function (item) { return item.value === value; });
      if (input) input.checked = true;
    });
  }

  function resetFinder() {
    form.reset();
    window.history.replaceState(null, '', window.location.pathname + '#finder-tool');
    render({scroll:false});
    form.querySelector('input[name="project"]')?.focus();
  }

  applyUrlParams();
  render({scroll:false});

  form.addEventListener('change', function () { render({scroll:false}); });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    render({scroll:true});
  });
  if (resetButton) resetButton.addEventListener('click', resetFinder);
})();
