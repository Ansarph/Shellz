import json, pathlib, shutil, re, textwrap
from datetime import date
base=pathlib.Path('/mnt/data/greengeeks_update_work')
assets=base/'assets/evidence'
assets.mkdir(parents=True, exist_ok=True)
# Copy screenshots
shutil.copyfile('/mnt/data/www.greengeeks.com_signup_step2.png', assets/'greengeeks-ecosite-lite-25-annual-checkout-20260712.png')
shutil.copyfile('/mnt/data/www.greengeeks.com_wordpress-hosting_.png', assets/'greengeeks-wordpress-hosting-plans-public-page-20260712.png')

# Update pricing
pricing_path=base/'data/pricing.json'
pricing=json.loads(pricing_path.read_text())
pricing['updated']='2026-07-12'
pricing['plans']['greengeeks-ecosite-lite-25-12m']={
    "provider_key":"greengeeks",
    "provider":"GreenGeeks",
    "plan":"Ecosite Lite 25 annual checkout",
    "regionCurrency":"USD checkout; country field Singapore; server location Singapore",
    "introLabel":"$2.95/mo annual package; $35.40 total today after $132.00 discount",
    "introMonthly":2.95,
    "introTerm":"12 months; GreenGeeks Ecosite Lite 25 cart captured 2026-07-12",
    "introTermMonths":12,
    "firstTermTotal":35.40,
    "couponDiscountAmount":132.00,
    "couponLabel":"Coupon savings shown in cart; no typed code visible in screenshot",
    "renewalLabel":"Regular annual package price shown as $167.40; checkout says promo applies only to initial term and renews at regular price",
    "renewalMonthly":13.95,
    "renewalAnnual":167.40,
    "renewalTerm":"Estimated from displayed regular annual package price; no separate future invoice line shown",
    "renewalTermMonths":12,
    "renewalTotal":167.40,
    "lastChecked":"2026-07-12",
    "status":"Shellz GreenGeeks checkout screenshot published: Ecosite Lite 25 annual cart with $35.40 first invoice and $167.40 regular annual package shown",
    "evidenceStatus":"shellz-checkout-capture-regular-price-estimate",
    "threeYearCost":370.20,
    "threeYearCostNote":"Estimated as $35.40 first year plus two years at the displayed $167.40 regular annual package price. Re-check live cart before paying.",
    "providerSource":"https://www.greengeeks.com/track/ansarph",
    "reviewUrl":"greengeeks-checkout-evidence.html",
    "evidencePage":"greengeeks-checkout-evidence.html",
    "screenshotUrls":[
        "assets/evidence/greengeeks-ecosite-lite-25-annual-checkout-20260712.png",
        "assets/evidence/greengeeks-wordpress-hosting-plans-public-page-20260712.png"
    ],
    "notes":"Domain shown as shellz.com. Screenshot shows Singapore in the country field and Singapore as server location. Renewal is estimated from displayed regular annual package price, not a separate confirmed renewal invoice. Screenshot does not verify speed, uptime or support."
}
pricing_path.write_text(json.dumps(pricing, indent=2)+"\n")

# Update evidence
path=base/'data/evidence.json'
ev=json.loads(path.read_text())
ev['updated']='2026-07-12'
ev['providers']['greengeeks']={
    "public_status": True,
    "public_order": 6,
    "publicSummary":"GreenGeeks Ecosite Lite 25 annual checkout evidence is published with $35.40 first invoice and $167.40 regular annual package shown.",
    "checkoutLabel":"Checkout screenshot published: Ecosite Lite 25 annual cart with discount and regular annual package visible.",
    "checkout":{
        "published": True,
        "date":"2026-07-12",
        "url":"greengeeks-checkout-evidence.html",
        "screenshots":[
            "greengeeks-ecosite-lite-25-annual-checkout-20260712.png",
            "greengeeks-wordpress-hosting-plans-public-page-20260712.png"
        ]
    },
    "coupon":{
        "page_published": True,
        "tested": True,
        "tested_codes": [],
        "note":"Checkout screenshot showed coupon savings / total discount of $132.00, but no typed public code was visible."
    },
    "renewal":{
        "status":"shellz-cart-evidence-regular-price-estimate",
        "plan_keys":["greengeeks-ecosite-lite-25-12m"],
        "note":"Regular annual package price shown as $167.40; renewal estimate is based on that displayed regular price."
    },
    "speed":{"published":False},
    "uptime":{"published":False},
    "support":{"published":False},
    "next_action":"Re-check the live GreenGeeks cart before publishing a full review; capture any final renewal invoice line if available and add independent speed, uptime and support testing."
}
path.write_text(json.dumps(ev, indent=2)+"\n")

# Update coupon checks
path=base/'data/coupon-checks.json'
cu=json.loads(path.read_text())
cu['updated']='2026-07-12'
cu['status_note']='A published coupon page is not a captured checkout test. Hostinger, Bluehost, HostGator, ScalaHosting, WPX and GreenGeeks rows with dated screenshot URLs are Shellz cart captures from 2026-07-12; other codes remain unverified until direct evidence exists.'
cu['checks']['greengeeks-affiliate-link']={
    "provider_key":"greengeeks",
    "code": None,
    "label":"GreenGeeks Ecosite Lite 25 annual checkout evidence",
    "date_checked":"2026-07-12",
    "page_url":"promo-codes.html#greengeeks",
    "page_published": True,
    "checkout_capture": True,
    "code_applied": True,
    "renewal_visible": True,
    "status":"GreenGeeks checkout captured $35.40 first invoice and $132.00 discount; no typed public code visible. Regular annual package shown as $167.40 with first-term-only promo notice.",
    "evidence_page":"greengeeks-checkout-evidence.html",
    "screenshots":[
        "assets/evidence/greengeeks-ecosite-lite-25-annual-checkout-20260712.png",
        "assets/evidence/greengeeks-wordpress-hosting-plans-public-page-20260712.png"
    ]
}
path.write_text(json.dumps(cu, indent=2)+"\n")

# Create GreenGeeks evidence page
page = r'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport"/>
<title>GreenGeeks Checkout Evidence 2026: First Invoice vs Regular Price | Shellz</title>
<meta content="GreenGeeks checkout evidence for Ecosite Lite 25 annual plan, including first invoice, coupon savings, server location, regular annual package price and renewal limitation notes." name="description"/>
<meta content="index, follow, max-image-preview:large" name="robots"/>
<link href="https://shellz.com/greengeeks-checkout-evidence.html" rel="canonical"/>
<meta content="GreenGeeks Checkout Evidence 2026: First Invoice vs Regular Price | Shellz" property="og:title"/>
<meta content="GreenGeeks checkout evidence for Ecosite Lite 25 annual plan, including first invoice, coupon savings and regular annual package price." property="og:description"/>
<meta content="article" property="og:type"/>
<meta content="https://shellz.com/greengeeks-checkout-evidence.html" property="og:url"/>
<meta content="https://shellz.com/assets/evidence/greengeeks-ecosite-lite-25-annual-checkout-20260712.png" property="og:image"/>
<link href="style.css?v=20260708-trust-cleanup" rel="stylesheet"/>
<link href="lovable-theme.css?v=20260708-trust-cleanup" rel="stylesheet"/>
<link href="global-professional-refresh.css?v=20260708-trust-cleanup" rel="stylesheet"/>
<link href="production-polish.css?v=20260708-trust-cleanup" rel="stylesheet"/>
<link href="shellz-global-mobile-menu-fix.css?v=20260708-trust-cleanup" rel="stylesheet"/>
<link href="hostinger-evidence.css?v=20260712-hostinger-proof" rel="stylesheet"/>
<link href="evidence-hub.css?v=20260712-greengeeks-proof" rel="stylesheet"/>
<link href="assets/favicon.png" rel="icon" type="image/png"/>
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://shellz.com/#organization","name":"Shellz","url":"https://shellz.com/","logo":{"@type":"ImageObject","url":"https://shellz.com/shellz-logo.png"}},{"@type":"WebSite","@id":"https://shellz.com/#website","name":"Shellz","url":"https://shellz.com/","publisher":{"@id":"https://shellz.com/#organization"}},{"@type":"BreadcrumbList","@id":"https://shellz.com/greengeeks-checkout-evidence.html#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://shellz.com/"},{"@type":"ListItem","position":2,"name":"Checkout Evidence","item":"https://shellz.com/hosting-checkout-evidence.html"},{"@type":"ListItem","position":3,"name":"GreenGeeks Checkout Evidence","item":"https://shellz.com/greengeeks-checkout-evidence.html"}]},{"@type":"Article","@id":"https://shellz.com/greengeeks-checkout-evidence.html#article","headline":"GreenGeeks Checkout Evidence 2026: First Invoice vs Regular Price","description":"GreenGeeks checkout evidence for Ecosite Lite 25 annual plan, including first invoice, coupon savings, server location, regular annual package price and renewal limitation notes.","datePublished":"2026-07-12","dateModified":"2026-07-12","author":{"@type":"Person","name":"Ansar P.H.","url":"https://shellz.com/ansar-ph.html"},"publisher":{"@id":"https://shellz.com/#organization"},"mainEntityOfPage":"https://shellz.com/greengeeks-checkout-evidence.html"}]}</script>
</head>
<body class="shellz-page"><a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><div class="container nav-container"><a aria-label="Shellz home" class="brand" href="index.html"><img alt="Shellz.com logo" class="brand-logo" height="233" src="shellz-logo.png" width="900"/></a><button aria-controls="primary-navigation" aria-expanded="false" aria-label="Toggle navigation" class="nav-toggle"><span></span><span></span><span></span></button><nav aria-label="Primary navigation" class="nav-links" id="primary-navigation"><a href="best-web-hosting.html">Best Hosting</a><a href="hosting-checkout-evidence.html">Evidence Hub</a><a href="hosting-renewal-price-database.html">Renewal Tracker</a><a href="web-hosting-finder.html">Hosting Finder</a><a href="reviews.html">Reviews</a><a href="promo-codes.html">Coupons</a></nav></div></header>
<main id="main-content">
<nav aria-label="Breadcrumb" class="container shellz-breadcrumbs"><a href="index.html">Home</a><span>›</span><a href="hosting-checkout-evidence.html">Checkout evidence</a><span>›</span><span aria-current="page">GreenGeeks checkout evidence</span></nav>
<section class="evidence-hero"><div class="container"><p class="eyebrow">GreenGeeks evidence · checked July 12, 2026</p><h1>GreenGeeks checkout evidence: Ecosite Lite 25 first invoice vs regular annual price</h1><p>Shellz checked a GreenGeeks Ecosite Lite 25 annual checkout example. The screenshot shows the first invoice, coupon savings, server location and a first-term-only promotional-price notice. This is checkout evidence, not a speed, uptime or support test.</p><div class="evidence-action-row"><a class="btn primary" href="https://www.greengeeks.com/track/ansarph" rel="nofollow noopener noreferrer sponsored" target="_blank">Check current GreenGeeks offer</a><a class="btn secondary" href="hosting-checkout-evidence.html">Open evidence hub</a></div></div></section>
<section class="container"><div class="section-heading"><p class="eyebrow">Captured cart</p><h2>Ecosite Lite 25 annual checkout example</h2><p>The screenshot shows a discounted first invoice and a regular annual package price. Shellz labels the next-bill amount as an estimate from the displayed regular price because the screenshot does not show a separate final renewal invoice line.</p></div><div class="table-wrap"><table class="evidence-table"><thead><tr><th>GreenGeeks plan</th><th>Term / location</th><th>First invoice shown</th><th>Discount / regular price</th><th>Estimated next 12-month renewal</th><th>Evidence</th></tr></thead><tbody><tr><td><strong>Ecosite Lite 25</strong><br><span>Domain shown: shellz.com</span></td><td>Annual / 12 months<br><span>Server location: Singapore</span></td><td><strong>$35.40</strong><br>$2.95/mo</td><td>$132.00 coupon savings<br>Regular annual package: $167.40</td><td><strong>$167.40</strong><br><span>estimated from displayed regular annual price</span></td><td><a href="assets/evidence/greengeeks-ecosite-lite-25-annual-checkout-20260712.png">Checkout screenshot</a></td></tr></tbody></table></div></section>
<section class="container evidence-summary-grid"><article class="evidence-summary-card"><span>First invoice</span><strong>$35.40</strong><p>The captured checkout showed Ecosite Lite 25 at $2.95/mo for the annual package.</p></article><article class="evidence-summary-card"><span>Discount shown</span><strong>$132.00 saved</strong><p>The pricing summary showed coupon savings and total discount of $132.00.</p></article><article class="evidence-summary-card"><span>Regular annual package</span><strong>$167.40</strong><p>Shellz estimates the next annual renewal from this displayed regular annual package price.</p></article></section>
<section class="container evidence-callout"><h2>What this proves — and what it does not</h2><p><strong>It proves:</strong> the captured GreenGeeks plan name, annual term, domain shown, Singapore server location, $35.40 first invoice, $132.00 discount and $167.40 regular annual package shown in the dated checkout screenshot.</p><p><strong>It does not prove:</strong> a final separate renewal invoice, future prices, another country, another currency, another server location, uptime, speed, support quality or that the same discount will remain available later.</p><p><strong>Marketing-page note:</strong> the separate GreenGeeks WordPress hosting page screenshot is public provider marketing evidence. It supports plan positioning, but it is not a Shellz checkout test.</p><div class="evidence-action-row"><a class="btn primary" href="hosting-renewal-price-database.html">Open renewal tracker</a><a class="btn secondary" href="promo-codes.html#greengeeks">Open GreenGeeks deal note</a></div></section>
<section class="container"><div class="section-heading"><p class="eyebrow">Screenshot proof</p><h2>GreenGeeks captures</h2></div><div class="evidence-screenshot-strip"><figure><img alt="GreenGeeks Ecosite Lite 25 annual checkout screenshot showing $35.40 total, $132.00 savings and $167.40 regular annual package" loading="lazy" src="assets/evidence/greengeeks-ecosite-lite-25-annual-checkout-20260712.png"/><figcaption>Ecosite Lite 25 annual checkout: $35.40 first invoice, $132.00 discount, regular annual package $167.40.</figcaption></figure><figure><img alt="GreenGeeks WordPress hosting public marketing page screenshot with WordPress plans and $2.95/mo entry price" loading="lazy" src="assets/evidence/greengeeks-wordpress-hosting-plans-public-page-20260712.png"/><figcaption>Public GreenGeeks WordPress hosting page: plan marketing and entry-price context, not checkout proof.</figcaption></figure></div></section>
</main><footer class="site-footer"><div class="container footer-grid"><div><a aria-label="Shellz home" class="brand footer-brand" href="index.html"><img alt="Shellz.com logo" class="brand-logo" height="233" src="shellz-logo.png" width="900"/></a><p>Shellz helps hosting buyers compare exact plan examples, renewal risk, coupon status, and published proof before paying.</p></div><div><h2>Buyer guides</h2><a href="best-web-hosting.html">Best Web Hosting</a><a href="hosting-checkout-evidence.html">Checkout Evidence Hub</a><a href="hosting-renewal-price-database.html">Renewal Price Tracker</a><a href="hosting-cost-calculator.html">Hosting Cost Calculator</a></div><div><h2>Check before buying</h2><a href="hosting-coupons-that-work.html">Hosting Coupons</a><a href="promo-codes.html">Hosting &amp; Promo Status</a><a href="hosting-testing-status.html">Testing &amp; Proof Status</a><a href="web-hosting-finder.html">Hosting Finder</a></div><div><h2>Compare &amp; trust</h2><a href="reviews.html">All Reviews</a><a href="methodology.html">Methodology</a><a href="disclosure.html">Affiliate Disclosure</a><a href="contact.html">Contact</a></div></div><div class="container footer-bottom"><p>© 2026 Shellz. All rights reserved.</p></div></footer>
<script src="script.js?v=20260621-footer-gap-fix"></script>
</body></html>
'''
# clean escaped quotes caused by raw string
page=page.replace('\\"','"')
(base/'greengeeks-checkout-evidence.html').write_text(page)

# Update hosting-checkout-evidence.html
hub_path=base/'hosting-checkout-evidence.html'
hub=hub_path.read_text()
hub=hub.replace('Hostinger, Bluehost, HostGator, ScalaHosting and WPX', 'Hostinger, Bluehost, HostGator, ScalaHosting, WPX and GreenGeeks')
hub=hub.replace('Hostinger, Bluehost, HostGator, ScalaHosting and WPX checkout proof is now published', 'Hostinger, Bluehost, HostGator, ScalaHosting, WPX and GreenGeeks checkout proof is now published')
hub=hub.replace('5 providers</span><strong>Hostinger, Bluehost, HostGator, ScalaHosting and WPX</strong>', '6 providers</span><strong>Hostinger, Bluehost, HostGator, ScalaHosting, WPX and GreenGeeks</strong>')
# Insert GreenGeeks rows before </tbody>
gg_row='<tr><td><strong>GreenGeeks</strong><br><span>Ecosite Lite 25</span></td><td>12 months</td><td>Coupon savings visible; no typed code shown</td><td><strong>$35.40</strong></td><td>Regular annual package shown as $167.40; estimated renewal</td><td><a href="greengeeks-checkout-evidence.html">1 checkout screenshot</a></td></tr>'
if 'greengeeks-checkout-evidence.html' not in hub:
    hub=hub.replace('</tbody></table></div></section>', gg_row+'</tbody></table></div></section>',1)
# Add action/button link in callout
hub=hub.replace('<a class="btn secondary" href="wpx-save79-coupon-test.html">WPX proof</a></div></section>', '<a class="btn secondary" href="wpx-save79-coupon-test.html">WPX proof</a><a class="btn secondary" href="greengeeks-checkout-evidence.html">GreenGeeks proof</a></div></section>')
# Add screenshot sample after WPX figure
wpxfig='<figure><img alt="WPX monthly Starter cart with SAVE79 applied" loading="lazy" src="assets/evidence/wpx-starter-monthly-save79-applied-20260712.png"/><figcaption>WPX monthly Starter cart with SAVE79 applied and next charge visible.</figcaption></figure>'
ggfig=wpxfig+'<figure><img alt="GreenGeeks Ecosite Lite 25 annual checkout screenshot" loading="lazy" src="assets/evidence/greengeeks-ecosite-lite-25-annual-checkout-20260712.png"/><figcaption>GreenGeeks Ecosite Lite 25 annual cart with $35.40 first invoice and $167.40 regular annual package shown.</figcaption></figure>'
hub=hub.replace(wpxfig,ggfig)
hub_path.write_text(hub)

# Update index evidence proof grid and copy
idx_path=base/'index.html'
idx=idx_path.read_text()
idx=idx.replace('Hostinger, Bluehost, HostGator, ScalaHosting and WPX checkout proof is now published', 'Hostinger, Bluehost, HostGator, ScalaHosting, WPX and GreenGeeks checkout proof is now published')
# Add GreenGeeks card before proof-grid close if not exists
if 'greengeeks-checkout-evidence.html' not in idx:
    card='<article><strong>GreenGeeks</strong><span data-evidence-provider="greengeeks" data-evidence-field="publicSummary">GreenGeeks Ecosite Lite 25 annual checkout evidence is published with first invoice and regular annual package price.</span><small data-evidence-provider="greengeeks" data-evidence-field="checkoutLabel">Checkout screenshot published: Ecosite Lite 25 annual cart with discount and regular annual package visible.</small><a href="greengeeks-checkout-evidence.html">See GreenGeeks proof</a></article>'
    idx=idx.replace('</div></section>\n<section class="section" id="comparison">', card+'</div></section>\n<section class="section" id="comparison">')
idx_path.write_text(idx)

# Update renewal tracker page text
rp=base/'hosting-renewal-price-database.html'
renew=rp.read_text()
renew=renew.replace('Hostinger, Bluehost, HostGator, ScalaHosting and WPX checkout evidence is collected in the Shellz evidence hub.', 'Hostinger, Bluehost, HostGator, ScalaHosting, WPX and GreenGeeks checkout evidence is collected in the Shellz evidence hub.')
rp.write_text(renew)

# Update promo-codes GreenGeeks card
pp=base/'promo-codes.html'
promo=pp.read_text()
promo=promo.replace('<div><dt>Last checked</dt><dd>June 30, 2026</dd></div></dl><p class="promo-before-buy"><strong>Before buying:</strong> Check intro price, renewal price, included storage, backup policy, domain rules, and whether the plan fits your traffic.</p></div>\n<div class="coupon-action-panel"><button class="show-code-btn" data-code="Check current GreenGeeks deal" data-provider="GreenGeeks" data-real-code="false" data-review="best-web-hosting.html" data-title="GreenGeeks deal check" data-url="https://www.greengeeks.com/track/ansarph" type="button"><span class="show-code-label">Check deal</span></button><a class="coupon-review-link shellz-track-cta" data-cta="cta-click" data-offer-type="internal-guide" data-page-type="coupon" data-provider="shellz" href="best-web-hosting.html">Compare hosting</a><a class="coupon-review-link shellz-track-cta" data-cta="cta-click" data-offer-type="internal-tool" data-page-type="coupon" data-provider="shellz" href="hosting-cost-calculator.html">Estimate cost</a></div>', '<div><dt>Last checked</dt><dd>July 12, 2026</dd></div></dl><p class="promo-before-buy"><strong>Checkout evidence:</strong> Shellz captured an Ecosite Lite 25 annual cart showing $35.40 due today, $132.00 savings and a $167.40 regular annual package price. Re-check the live cart before paying.</p></div>\n<div class="coupon-action-panel"><button class="show-code-btn" data-code="Check current GreenGeeks deal" data-provider="GreenGeeks" data-real-code="false" data-review="greengeeks-checkout-evidence.html" data-title="GreenGeeks deal check" data-url="https://www.greengeeks.com/track/ansarph" type="button"><span class="show-code-label">Check deal</span></button><a class="coupon-review-link shellz-track-cta" data-cta="cta-click" data-offer-type="internal-evidence" data-page-type="coupon" data-provider="greengeeks" href="greengeeks-checkout-evidence.html">View proof</a><a class="coupon-review-link shellz-track-cta" data-cta="cta-click" data-offer-type="internal-tool" data-page-type="coupon" data-provider="shellz" href="hosting-cost-calculator.html">Estimate cost</a></div>')
promo=promo.replace('<tr><td>GreenGeeks</td><td>Medium</td><td>Medium</td><td>Medium</td><td>Check intro term, renewal price, and included resources.</td></tr>', '<tr><td>GreenGeeks</td><td>Medium</td><td>Medium</td><td>Medium</td><td>Shellz checkout captured $35.40 first invoice and $167.40 regular annual package; verify current cart before paying.</td></tr>')
promo=promo.replace('<article class="mini-card"><h3><a href="#greengeeks">GreenGeeks deal check</a></h3><p>Eco-friendly shared hosting offer notes.</p></article>', '<article class="mini-card"><h3><a href="greengeeks-checkout-evidence.html">GreenGeeks checkout evidence</a></h3><p>Eco-friendly shared hosting cart proof and regular annual price note.</p></article>')
pp.write_text(promo)

# Update new-gen-hosting GreenGeeks section with proof link if possible
ng=base/'new-gen-hosting.html'
text=ng.read_text()
if 'greengeeks-checkout-evidence.html' not in text:
    text=text.replace('<p>GreenGeeks gives Shellz a separate long-tail angle: green hosting, renewable-energy hosting, and sustainable WordPress hosting.</p>', '<p>GreenGeeks gives Shellz a separate long-tail angle: green hosting, renewable-energy hosting, and sustainable WordPress hosting. Shellz now has a dated Ecosite Lite 25 annual checkout capture with first invoice and regular annual package price shown.</p><p><a class="btn secondary" href="greengeeks-checkout-evidence.html">View GreenGeeks checkout evidence</a></p>')
ng.write_text(text)

# Update generator to list GreenGeeks hub page as evidence hub
script=base/'scripts/generate-renewal-pages.js'
gen=script.read_text()
if 'greengeeks-checkout-evidence.html' not in gen:
    gen=gen.replace("{ slug: 'wpx-save79-coupon-test.html', status: 'published_after_manual_review', purpose: 'WPX SAVE79 monthly accepted / annual rejected coupon evidence page.' }", "{ slug: 'wpx-save79-coupon-test.html', status: 'published_after_manual_review', purpose: 'WPX SAVE79 monthly accepted / annual rejected coupon evidence page.' },\n    { slug: 'greengeeks-checkout-evidence.html', status: 'published_after_manual_review', purpose: 'GreenGeeks Ecosite Lite 25 annual checkout evidence page.' }")
script.write_text(gen)

# Update sitemap
sm=base/'sitemap.xml'
smap=sm.read_text()
if 'greengeeks-checkout-evidence.html' not in smap:
    entry='''\n  <url>\n    <loc>https://shellz.com/greengeeks-checkout-evidence.html</loc>\n    <lastmod>2026-07-12</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.83</priority>\n  </url>\n'''
    smap=smap.replace('</urlset>', entry+'</urlset>')
sm.write_text(smap)

# Update manifest and audit summary
manifest=base/'UPDATE-MANIFEST.txt'
old=manifest.read_text() if manifest.exists() else ''
append='''\n\n2026-07-12 - GreenGeeks Checkout Evidence Update\n- Added greengeeks-checkout-evidence.html.\n- Added GreenGeeks checkout and marketing screenshots under assets/evidence/.\n- Updated data/pricing.json, data/evidence.json, data/coupon-checks.json and rebuilt shellz-data.js.\n- Updated hosting-checkout-evidence.html, index.html, hosting-renewal-price-database.html, promo-codes.html, new-gen-hosting.html and sitemap.xml.\n- Added GreenGeeks to the evidence hub as checkout evidence with renewal estimated from displayed regular annual package price, not a final renewal invoice.\n'''
if 'GreenGeeks Checkout Evidence Update' not in old:
    manifest.write_text(old+append)

audit=base/'SEO-AUDIT-AFTER-UPDATE.md'
old=audit.read_text() if audit.exists() else ''
append='''\n\n## GreenGeeks Checkout Evidence Update - 2026-07-12\n\nAdded GreenGeeks Ecosite Lite 25 annual checkout evidence. The published checkout page records a $35.40 first invoice, $132.00 discount, Singapore server location, and $167.40 regular annual package price. Renewal is labelled as an estimate from the displayed regular annual package price because no separate future renewal invoice line was shown.\n\nEvidence hub now covers six providers: Hostinger, Bluehost, HostGator, ScalaHosting, WPX and GreenGeeks.\n'''
if 'GreenGeeks Checkout Evidence Update' not in old:
    audit.write_text(old+append)
