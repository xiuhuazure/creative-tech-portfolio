/* =========================================================================
   Site footer — cinematic globe arc (adapted from "Footer 02 Velara").
   Renders into <footer class="vf" id="site-footer">, replacing its static
   fallback. Styles live in site-footer.css. No dependencies.
   ========================================================================= */
(function () {
  var host = document.getElementById('site-footer');
  if (!host) return;

  var LINKEDIN = 'https://linkedin.com/in/kimberly-d-yu';
  var GITHUB = 'https://github.com/xiuhuazure';
  // Map pin (Feather icon via Streamline), drawn in the text colour
  var PIN_ICON = '<svg class="vf-pin-ico" viewBox="-0.5 -0.5 16 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><path d="M13.125 6.25c0 4.375 -5.625 8.125 -5.625 8.125s-5.625 -3.75 -5.625 -8.125a5.625 5.625 0 0 1 11.25 0z" stroke-width="1"/><path d="M5.625 6.25a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 1 0 -3.75 0" stroke-width="1"/></svg>';

  // Pins sit on the arc ellipse: centre (700, 430), radii a = 860, b = 200
  var CX = 700, CY = 430, A = 860, B = 200;
  // Each skill links straight to its work (index.html#folder-… opens that folder; see site-showcase.js)
  var PINS = [
    { x: 330,  label: '💻 Front-end Development', href: 'index.html#folder-school' },
    { x: 700,  label: '🎬 Video Editing', href: 'index.html#folder-client' },
    { x: 1070, label: '🎨 Graphic Design', href: 'index.html#folder-client' }
  ];
  function arcY(x) { var t = (x - CX) / A; return CY - B * Math.sqrt(1 - t * t); }
  function esc(s) { return s.replace(/&/g, '&amp;'); }

  // 35 sparkles scattered along the upper arc (180° → 360°)
  var sparkles = '';
  for (var i = 0; i < 35; i++) {
    var ang = Math.PI + (Math.PI * i) / 34;
    var rx = A + (Math.random() * 20 - 10), ry = B + (Math.random() * 20 - 10);
    sparkles += '<circle class="vf-spark" cx="' + (CX + rx * Math.cos(ang)).toFixed(1) + '" cy="' + (CY + ry * Math.sin(ang)).toFixed(1) +
      '" r="' + (0.5 + Math.random() * 1.5).toFixed(2) + '" fill="#f6e3b0" opacity="' + (0.3 + Math.random() * 0.5).toFixed(2) + '"/>';
  }

  var pins = PINS.map(function (p, i) {
    var y = arcY(p.x).toFixed(1);
    return '<g class="vf-pin" data-i="' + i + '">' +
      '<circle class="halo" cx="' + p.x + '" cy="' + y + '" r="14" fill="#d0583f" filter="url(#vfGlow)"/>' +
      '<circle class="dot" cx="' + p.x + '" cy="' + y + '" r="4"/></g>';
  }).join('');

  var badges = PINS.map(function (p, i) {
    return '<div class="vf-badge" data-i="' + i + '"><a class="pill" href="' + p.href + '">' + esc(p.label) + '</a><div class="line"></div></div>';
  }).join('');

  // Phones and tablets: the arc is too narrow for five labels, so it becomes an orbit. The
  // checkpoints travel along the line and each one stops at the top, in focus, with its label.
  var orbit = '<div class="vf-orbit">' +
    '<a class="pill" href="' + PINS[0].href + '">' + esc(PINS[0].label) + '</a><div class="line"></div></div>';

  function col(title, items) {
    return '<div><h4>' + title + '</h4><ul>' + items.map(function (it) {
      if (!it[1]) return '<li class="plain">' + (it[2] === 'pin' ? PIN_ICON : '') + esc(it[0]) + '</li>';
      var ext = /^https?:/.test(it[1]) ? ' target="_blank" rel="noopener"' : '';
      return '<li><a href="' + it[1] + '"' + ext + '>' + esc(it[0]) + '</a></li>';
    }).join('') + '</ul></div>';
  }

  host.innerHTML =
    '<div class="vf-globe">' +
      '<svg viewBox="0 0 1400 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
        '<defs>' +
          '<radialGradient id="vfPlanet" cx="50%" cy="100%" r="100%">' +
            '<stop class="vf-s0" offset="0%" stop-color="#d4af62"/><stop class="vf-s1" offset="60%" stop-color="#4a160d"/><stop class="vf-s2" offset="100%" stop-color="#010100"/>' +
          '</radialGradient>' +
          '<filter id="vfGlow" x="-50%" y="-50%" width="200%" height="200%">' +
            '<feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
          '</filter>' +
        '</defs>' +
        '<ellipse cx="700" cy="420" rx="900" ry="220" fill="url(#vfPlanet)"/>' +
        '<ellipse class="vf-ring" cx="700" cy="430" rx="860" ry="200" fill="none" stroke="#d4af62" stroke-width="2.5" opacity="0.9"/>' +
        '<ellipse class="vf-ring-glow" cx="700" cy="430" rx="860" ry="200" fill="none" stroke="#f2d999" stroke-width="12" opacity="0.15" filter="url(#vfGlow)"/>' +
        '<path class="vf-comet" d="M -160 430 A 860 200 0 0 1 1560 430" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.6" filter="url(#vfGlow)"/>' +
        sparkles + pins +
        '<circle class="vf-top" cx="700" cy="230" r="4"/>' +
      '</svg>' +
      badges + orbit +
    '</div>' +
    '<div class="vf-links">' +
      '<div class="vf-grid">' +
        col('Navigate', [['Home', 'index.html'], ['Works', 'index.html#projects'], ['Case study', 'case-study.html'], ['About me', 'about.html']]) +
        col('Contact', [['Email', 'index.html#contact'], ['LinkedIn', LINKEDIN], ['GitHub', GITHUB], ['Philippines', null, 'pin']]) +
      '</div>' +
    '</div>' +
    '<div class="vf-bar"><div class="vf-bar-in">' +
      '<span>© 2026 Kimberly D. Yu. All rights reserved.</span>' +
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

  // Each pin's place on the arc ellipse (x = CX + A·cos θ, y = CY − B·sin θ)
  var HOME = PINS.map(function (p) { return Math.acos((p.x - CX) / A); });
  function placePin(i, theta, focus) {
    var x = (CX + A * Math.cos(theta)).toFixed(1), y = (CY - B * Math.sin(theta)).toFixed(1);
    var halo = pinEls[i].querySelector('.halo'), dot = pinEls[i].querySelector('.dot');
    halo.setAttribute('cx', x); halo.setAttribute('cy', y); dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    halo.setAttribute('r', (14 + 9 * focus).toFixed(1)); dot.setAttribute('r', (4 + 2.5 * focus).toFixed(2));
    halo.style.opacity = (0.18 + 0.5 * focus).toFixed(2);
  }
  function resetPins() {
    for (var i = 0; i < pinEls.length; i++) { placePin(i, HOME[i], 0); pinEls[i].querySelector('.halo').style.opacity = ''; }
  }

  // Anchor each badge to its pin's real on-screen position (the SVG is "slice"-scaled,
  // so fixed percentages drift); hide badges whose pin is cropped off the edge.
  var orbiting = false;
  function layout() {
    globe.classList.remove('is-slides'); // measure the labels on the arc first
    resetPins();
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
    // Not every label fits on the arc: switch to the orbit
    orbiting = visible.length < pinEls.length;
    globe.classList.toggle('is-slides', orbiting);
    if (orbiting) { measureOrbit(); drawOrbit(pos); placeLabel(); }
  }

  // ---- Orbit ----
  var orbitEl = host.querySelector('.vf-orbit'), orbitPill = orbitEl.querySelector('.pill');
  var svg = globe.querySelector('svg'), N = PINS.length, pos = 0, step0 = 0.2, moving = false, lastMove = 0;
  // Spacing between checkpoints: the next one sits near the edge of the screen, the rest beyond it
  function measureOrbit() {
    var r = svg.getBoundingClientRect(), scale = Math.max(r.width / 1400, r.height / 420);
    var half = (globe.getBoundingClientRect().width / 2) / scale; // half the visible width, in SVG units
    step0 = Math.asin(Math.min(0.95, (half * 0.74) / A));
  }
  function drawOrbit(p) {
    for (var i = 0; i < N; i++) {
      var d = ((i - p) % N + N + N / 2) % N - N / 2; // -2.5 … 2.5: where this pin is relative to the top
      placePin(i, Math.PI / 2 - d * step0, Math.max(0, 1 - Math.abs(d) * 1.6));
    }
  }
  function placeLabel() {
    var g = globe.getBoundingClientRect(), t = host.querySelector('.vf-top').getBoundingClientRect();
    orbitEl.style.top = (t.top + t.height / 2 - g.top) + 'px';
  }
  function setLabel(i) {
    orbitPill.textContent = PINS[i].label.replace(/&amp;/g, '&');
    orbitPill.href = PINS[i].href;
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function travel() {
    if (!orbiting || moving) return;
    lastMove = Date.now();
    var from = pos, to = Math.round(pos) + 1, t0 = 0, dur = reduce ? 0 : 1200;
    moving = true; orbitEl.classList.add('is-moving');
    var ease = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
    var frame = function (now) {
      if (!t0) t0 = now;
      var k = dur ? Math.min(1, (now - t0) / dur) : 1;
      pos = from + (to - from) * ease(k);
      drawOrbit(pos);
      if (k < 1) return requestAnimationFrame(frame);
      pos = to % N; moving = false;
      setLabel(pos); orbitEl.classList.remove('is-moving');
    };
    requestAnimationFrame(frame);
  }
  globe.addEventListener('click', function (e) { if (orbiting && !e.target.closest('a')) travel(); }); // tap to move on

  layout();
  window.addEventListener('load', layout);
  var raf = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); });

  setInterval(function () {
    if (document.hidden) return;
    if (orbiting) { if (Date.now() - lastMove > 4000) travel(); return; } // a tap restarts the wait
    if (reduce || !visible.length) return;
    step = (step + 1) % visible.length;
    setActive(visible[step]);
  }, 4500); // a new skill every 4.5 seconds (1.2 s of travel, then 3.3 s in focus)

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
