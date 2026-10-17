/* =========================================================================
   Site motion — header blend, typing roles, counting stats, card tilt, scroll progress.
   Shared by every page; styles live in site-motion.css. No dependencies.
   ========================================================================= */
(function () {
  // ---- Header: transparent at the very top, solid once you scroll (not motion, so always on) ----
  var header = document.querySelector('header');
  if (header) {
    var setTop = function () { header.classList.toggle('at-top', window.scrollY < 8); };
    // Apply the first state without the fade, so the page doesn't flash on load
    header.style.transition = 'none';
    setTop();
    void header.offsetHeight;
    header.style.transition = '';
    window.addEventListener('scroll', setTop, { passive: true });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // ---- Scroll progress line ----
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var ticking = false;
  function progress() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(progress); } }, { passive: true });
  window.addEventListener('resize', progress);
  progress();

  // ---- Typing roles: type, pause, delete, next ----
  var typed = document.querySelector('.typed[data-words]');
  if (typed) {
    var words = typed.getAttribute('data-words').split('|');
    var wi = 0, ci = words[0].length, deleting = true;
    var tick = function () {
      var word = words[wi];
      if (deleting) {
        ci--;
        typed.textContent = word.slice(0, ci);
        if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; return setTimeout(tick, 320); }
        return setTimeout(tick, 38);
      }
      ci++;
      typed.textContent = words[wi].slice(0, ci);
      if (ci >= words[wi].length) { deleting = true; return setTimeout(tick, 1800); }
      setTimeout(tick, 72);
    };
    setTimeout(tick, 2400);
  }

  // ---- Counting stats (start when they scroll into view) ----
  var nums = document.querySelectorAll('[data-count]');
  if (nums.length && 'IntersectionObserver' in window) {
    var count = function (el) {
      var to = +el.getAttribute('data-count'), from = +(el.getAttribute('data-from') || 0);
      var dur = 1500, t0 = performance.now();
      (function step(t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(from + (to - from) * e);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { cio.unobserve(e.target); count(e.target); } });
    }, { threshold: 0.6 });
    for (var n = 0; n < nums.length; n++) {
      nums[n].textContent = nums[n].getAttribute('data-from') || '0';
      cio.observe(nums[n]);
    }
  }

  // ---- 3D tilt + glare on cards (mouse / trackpad only) ----
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var cards = document.querySelectorAll('.card, .work-card, .deliv .col');
    for (var c = 0; c < cards.length; c++) (function (el) {
      el.classList.add('tilt');
      var glare = document.createElement('span');
      glare.className = 'glare';
      glare.setAttribute('aria-hidden', 'true');
      el.appendChild(glare);
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
        el.style.setProperty('--ry', ((x - 0.5) * 10).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        el.classList.add('tilting');
      });
      el.addEventListener('pointerleave', function () { el.classList.remove('tilting'); });
    })(cards[c]);
  }

  // A sparkle glint: glowing core, long thin rays up/down/left/right, shorter diagonal rays
  var STAR = '<svg viewBox="-12 -12 24 24">' +
    '<circle r="3.2" opacity="0.25"/><circle r="1.3"/>' +
    '<path d="M0 -12L0.55 0L0 12L-0.55 0Z"/><path d="M-12 0L0 0.55L12 0L0 -0.55Z"/>' +
    '<path d="M0 -6L0.4 0L0 6L-0.4 0Z" transform="rotate(45)" opacity="0.8"/>' +
    '<path d="M0 -6L0.4 0L0 6L-0.4 0Z" transform="rotate(-45)" opacity="0.8"/></svg>';

  // ---- Lantern: three sparkles twinkle around it ----
  var lantern = document.getElementById('lantern');
  if (lantern) {
    // [left, top, size, duration, delay] — % of the lantern box so they scale on phones;
    // kept off the left side up top, where the phone menu button sits
    [['100%', '10%', 20, 2.6, 0], ['108%', '62%', 16, 3.2, -1.1], ['-10%', '90%', 18, 2.9, -2]].forEach(function (p) {
      var st = document.createElement('span');
      st.className = 'ln-star';
      st.setAttribute('aria-hidden', 'true');
      st.innerHTML = STAR;
      st.style.cssText = '--x:' + p[0] + ';--y:' + p[1] + ';--s:' + p[2] + 'px;--dur:' + p[3] + 's;--delay:' + p[4] + 's';
      lantern.appendChild(st);
    });
  }

  // ---- Hero wave: sparkles twinkle at random spots along the (still) line ----
  var wave = document.querySelector('.cloud-strip svg');
  var guide = wave && wave.querySelector('.cs-line');
  if (guide) {
    var len = guide.getTotalLength();
    var place = function (el) {
      var pt = guide.getPointAtLength((0.03 + Math.random() * 0.94) * len);
      el.style.left = (pt.x / 14.4).toFixed(2) + '%'; // viewBox is 1440 wide
      el.style.top = pt.y.toFixed(1) + 'px';
    };
    for (var k = 0; k < 9; k++) {
      var el = document.createElement('span');
      el.className = 'cs-star';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = STAR;
      el.style.setProperty('--s', (14 + Math.random() * 12).toFixed(1) + 'px');
      el.style.setProperty('--dur', (2.6 + Math.random() * 2.4).toFixed(2) + 's');
      el.style.setProperty('--delay', (-Math.random() * 5).toFixed(2) + 's');
      place(el);
      // Each time a sparkle finishes twinkling, it reappears somewhere else on the line
      el.addEventListener('animationiteration', function (e) { place(e.currentTarget); });
      wave.parentNode.appendChild(el);
    }
  }
})();
