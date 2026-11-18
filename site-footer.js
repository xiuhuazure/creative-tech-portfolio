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
    { x: 190,  label: '🛍️ Shopify & Liquid', href: 'index.html#folder-web' },
    { x: 370,  label: '🎬 Video Editing', href: 'index.html#folder-video' },
    { x: 680,  label: '🛡️ Cybersecurity', href: 'about.html#certs' },
    { x: 870,  label: '💻 Front-end Development', href: 'index.html#folder-web' },
    { x: 1180, label: '📱 Android Apps', href: 'index.html#folder-apps' }
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

  // Phones: the arc is too narrow for five labels, so they become a swipeable slideshow at its top
  var slide = '<div class="vf-slide">' +
      '<p class="vf-slide-cap">What I do</p>' +
      '<div class="vf-slide-track">' + PINS.map(function (p) {
        return '<div class="vf-slide-item"><a class="pill" href="' + p.href + '">' + esc(p.label) + '</a></div>';
      }).join('') + '</div>' +
      '<div class="vf-slide-dots">' + PINS.map(function (p, i) {
        return '<button type="button" aria-label="Show ' + esc(p.label.replace(/^\S+\s/, '')) + '"></button>';
      }).join('') + '</div>' +
      '<div class="line"></div>' +
    '</div>';

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
      '<p class="vf-cap">What I do</p>' +
      badges + slide +
    '</div>' +
    '<div class="vf-links">' +
      '<div class="vf-grid">' +
        col('Navigate', [['Home', 'index.html'], ['Works', 'index.html#work'], ['Case study', 'case-study.html'], ['About me', 'about.html']]) +
        col('What I do', [['Shopify & Liquid', 'index.html#folder-web'], ['Front-end development', 'index.html#folder-web'], ['Video ads & motion graphics', 'index.html#folder-video'], ['Graphic design', 'index.html#folder-design'], ['Android apps', 'index.html#folder-apps'], ['Cybersecurity', 'about.html#certs']]) +
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

  // Anchor each badge to its pin's real on-screen position (the SVG is "slice"-scaled,
  // so fixed percentages drift); hide badges whose pin is cropped off the edge.
  function layout() {
    globe.classList.remove('is-slides'); // measure the labels on the arc first
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
    // Not every label fits on the arc: show them all as a slideshow instead
    globe.classList.toggle('is-slides', visible.length < pinEls.length);
  }

  // ---- Phone slideshow: swipe, tap a dot, or let it advance on its own ----
  var slideEl = host.querySelector('.vf-slide'), track = host.querySelector('.vf-slide-track');
  var dots = host.querySelectorAll('.vf-slide-dots button'), slideAt = 0, heldUntil = 0;
  function showSlide(i, smooth) {
    slideAt = (i + dots.length) % dots.length;
    track.scrollTo({ left: slideAt * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
    for (var k = 0; k < dots.length; k++) dots[k].classList.toggle('on', k === slideAt);
  }
  [].forEach.call(dots, function (d, i) { d.addEventListener('click', function () { heldUntil = Date.now() + 8000; showSlide(i, true); }); });
  var settle = 0; // after a swipe comes to rest, light the dot for the label in view
  track.addEventListener('scroll', function () {
    clearTimeout(settle);
    settle = setTimeout(function () {
      var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      if (i < 0 || i >= dots.length) return;
      slideAt = i;
      for (var k = 0; k < dots.length; k++) dots[k].classList.toggle('on', k === i);
    }, 140);
  }, { passive: true });
  ['touchstart', 'pointerdown'].forEach(function (t) { track.addEventListener(t, function () { heldUntil = Date.now() + 8000; }, { passive: true }); });
  // Sit the slideshow on the top of the arc
  function placeSlide() {
    if (getComputedStyle(slideEl).display === 'none') return;
    var g = globe.getBoundingClientRect(), t = host.querySelector('.vf-top').getBoundingClientRect();
    slideEl.style.top = (t.top + t.height / 2 - g.top) + 'px';
  }
  showSlide(0, false);

  layout(); placeSlide();
  window.addEventListener('load', function () { layout(); placeSlide(); });
  var raf = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { layout(); placeSlide(); showSlide(slideAt, false); }); });

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    setInterval(function () {
      if (!visible.length) return;
      step = (step + 1) % visible.length;
      setActive(visible[step]);
    }, 2500);
    setInterval(function () {
      if (Date.now() < heldUntil || getComputedStyle(slideEl).display === 'none') return;
      showSlide(slideAt + 1, true);
    }, 2800);
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
