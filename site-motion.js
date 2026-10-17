/* =========================================================================
   Site motion — typing roles, counting stats, card tilt, scroll progress.
   Shared by every page; styles live in site-motion.css. No dependencies.
   ========================================================================= */
(function () {
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

  // ---- Hero wave: the line ripples gently (ends stay pinned) ----
  var wave = document.querySelector('.cloud-strip svg');
  if (wave) {
    var shape = wave.querySelector('.cs-shape'), comet = wave.querySelector('.cs-comet');
    var XS = [0, 200, 300, 440, 560, 720, 880, 1040, 1180, 1360, 1440];
    var YS = [40, 18, 34, 12, 30, 16, 32, 14, 30, 18, 40];
    var waveOn = true;
    var waveLine = function (t) {
      var ys = YS.map(function (y, i) {
        return (i === 0 || i === YS.length - 1) ? y : y + 6 * Math.sin(t * 0.0009 + i * 1.3);
      });
      var d = 'M0 ' + ys[0];
      for (var i = 1; i < XS.length; i++) {
        var mx = (XS[i - 1] + XS[i]) / 2;
        d += ' C ' + mx + ' ' + ys[i - 1].toFixed(1) + ' ' + mx + ' ' + ys[i].toFixed(1) + ' ' + XS[i] + ' ' + ys[i].toFixed(1);
      }
      return d;
    };
    var waveTick = function (t) {
      if (waveOn) {
        var d = waveLine(t);
        if (comet) comet.setAttribute('d', d);
        if (shape) shape.setAttribute('d', d + ' L 1440 60 L 0 60 Z');
      }
      requestAnimationFrame(waveTick);
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { waveOn = entries[0].isIntersecting; }).observe(wave);
    }
    requestAnimationFrame(waveTick);
  }
})();
