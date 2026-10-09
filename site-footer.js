/* =========================================================================
   Site footer — cinematic globe arc (adapted from "Footer 02 Velara").
   Renders into <footer class="vf" id="site-footer">, replacing its static
   fallback. Styles live in site-footer.css. No dependencies.
   ========================================================================= */
(function () {
  var host = document.getElementById('site-footer');
  if (!host) return;

  var EMAIL = 'kimberlydacucoyu@gmail.com';
  var LINKEDIN = 'https://linkedin.com/in/kimberly-d-yu';
  var GITHUB = 'https://github.com/xiuhuazure';

  // Pins sit on the arc ellipse: centre (700, 430), radii a = 860, b = 200
  var CX = 700, CY = 430, A = 860, B = 200;
  var PINS = [
    { x: 190,  label: '🛍️ Shopify & Liquid' },
    { x: 370,  label: '🎬 Video Editing' },
    { x: 680,  label: '🇵🇭 Based in Pangasinan, PH' },
    { x: 870,  label: '✨ Motion Graphics' },
    { x: 1180, label: '📱 Android Apps' }
  ];
  function arcY(x) { var t = (x - CX) / A; return CY - B * Math.sqrt(1 - t * t); }
  function esc(s) { return s.replace(/&/g, '&amp;'); }

  // 35 sparkles scattered along the upper arc (180° → 360°)
  var sparkles = '';
  for (var i = 0; i < 35; i++) {
    var ang = Math.PI + (Math.PI * i) / 34;
    var rx = A + (Math.random() * 20 - 10), ry = B + (Math.random() * 20 - 10);
    sparkles += '<circle cx="' + (CX + rx * Math.cos(ang)).toFixed(1) + '" cy="' + (CY + ry * Math.sin(ang)).toFixed(1) +
      '" r="' + (0.5 + Math.random() * 1.5).toFixed(2) + '" fill="#f6e3b0" opacity="' + (0.3 + Math.random() * 0.5).toFixed(2) + '"/>';
  }

  var pins = PINS.map(function (p, i) {
    var y = arcY(p.x).toFixed(1);
    return '<g class="vf-pin" data-i="' + i + '">' +
      '<circle class="halo" cx="' + p.x + '" cy="' + y + '" r="14" fill="#d0583f" filter="url(#vfGlow)"/>' +
      '<circle class="dot" cx="' + p.x + '" cy="' + y + '" r="4"/></g>';
  }).join('');

  var badges = PINS.map(function (p, i) {
    return '<div class="vf-badge" data-i="' + i + '"><div class="pill">' + esc(p.label) + '</div><div class="line"></div></div>';
  }).join('');

  function col(title, items) {
    return '<div><h4>' + title + '</h4><ul>' + items.map(function (it) {
      if (!it[1]) return '<li class="plain">' + esc(it[0]) + '</li>';
      var ext = /^https?:/.test(it[1]) ? ' target="_blank" rel="noopener"' : '';
      return '<li><a href="' + it[1] + '"' + ext + '>' + esc(it[0]) + '</a></li>';
    }).join('') + '</ul></div>';
  }

  host.innerHTML =
    '<div class="vf-globe">' +
      '<svg viewBox="0 0 1400 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
        '<defs>' +
          '<radialGradient id="vfPlanet" cx="50%" cy="100%" r="100%">' +
            '<stop offset="0%" stop-color="#d4af62"/><stop offset="60%" stop-color="#4a160d"/><stop offset="100%" stop-color="#010100"/>' +
          '</radialGradient>' +
          '<filter id="vfGlow" x="-50%" y="-50%" width="200%" height="200%">' +
            '<feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
        '</defs>' +
        '<ellipse cx="700" cy="420" rx="900" ry="220" fill="url(#vfPlanet)"/>' +
        '<ellipse cx="700" cy="430" rx="860" ry="200" fill="none" stroke="#d4af62" stroke-width="2.5" opacity="0.9"/>' +
        '<ellipse cx="700" cy="430" rx="860" ry="200" fill="none" stroke="#f2d999" stroke-width="12" opacity="0.15" filter="url(#vfGlow)"/>' +
        '<path class="vf-comet" d="M -160 430 A 860 200 0 0 1 1560 430" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.6" filter="url(#vfGlow)"/>' +
        sparkles + pins +
      '</svg>' +
      badges +
    '</div>' +
    '<div class="vf-links">' +
      '<div class="vf-grid">' +
        col('Navigate', [['Home', 'index.html'], ['Work', 'work.html'], ['Case study', 'case-study.html'], ['About me', 'index.html#about']]) +
        col('What I do', [['Shopify & Liquid', 'index.html#services'], ['GemPages landing pages', 'index.html#services'], ['Video ads & motion graphics', 'index.html#services'], ['Android apps', 'index.html#services']]) +
        col('Projects', [['Earth Moon Magick', 'case-study.html'], ['FSLAMES (thesis)', 'work.html'], ['U-Eat Ordering System', 'work.html']]) +
        col('Contact', [['Email me', 'mailto:' + EMAIL], ['LinkedIn', LINKEDIN], ['GitHub', GITHUB], ['Pangasinan, Philippines', null]]) +
      '</div>' +
      '<div class="vf-social">' +
        '<a href="' + LINKEDIN + '" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a href="' + GITHUB + '" target="_blank" rel="noopener">GitHub</a>' +
        '<a href="mailto:' + EMAIL + '">Email</a>' +
      '</div>' +
    '</div>' +
    '<div class="vf-bar"><div class="vf-bar-in">' +
      '<span>© 2026 Kimberly D. Yu. All rights reserved.</span>' +
      '<span>BS Computer Science · Open to OJT</span>' +
    '</div></div>' +
    '<div class="vf-brand"><p class="vf-word" aria-hidden="true">KIMBERLY</p></div>';

  // ---- Pin + badge cycling ----
  var globe = host.querySelector('.vf-globe');
  var pinEls = host.querySelectorAll('.vf-pin');
  var badgeEls = host.querySelectorAll('.vf-badge');
  var visible = [], step = 0, current = -1;

  function setActive(i) {
    current = i;
    for (var j = 0; j < pinEls.length; j++) {
      pinEls[j].classList.toggle('active', j === i);
      badgeEls[j].classList.toggle('active', j === i);
    }
  }

  // Anchor each badge to its pin's real on-screen position (the SVG is "slice"-scaled,
  // so fixed percentages drift); hide badges whose pin is cropped off the edge.
  function layout() {
    var g = globe.getBoundingClientRect();
    visible = [];
    for (var i = 0; i < pinEls.length; i++) {
      var r = pinEls[i].querySelector('.dot').getBoundingClientRect();
      var cx = r.left + r.width / 2 - g.left, cy = r.top + r.height / 2 - g.top;
      var b = badgeEls[i];
      b.style.display = '';
      b.style.left = cx + 'px';
      b.style.top = (cy - 14) + 'px';
      var half = b.offsetWidth * 0.55;
      var fits = cx - half > 8 && cx + half < g.width - 8;
      b.style.display = fits ? '' : 'none';
      if (fits) visible.push(i);
    }
    if (visible.indexOf(current) === -1 && visible.length) { step = 0; setActive(visible[0]); }
  }

  layout();
  window.addEventListener('load', layout);
  var raf = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); });

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    setInterval(function () {
      if (!visible.length) return;
      step = (step + 1) % visible.length;
      setActive(visible[step]);
    }, 2500);
  }

  // ---- Wordmark: rise + colour shift each time it scrolls into view ----
  var brand = host.querySelector('.vf-brand');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { brand.classList.toggle('in', e.isIntersecting); });
    }, { threshold: 0.1 }).observe(brand);
  } else {
    brand.classList.add('in');
  }
})();
