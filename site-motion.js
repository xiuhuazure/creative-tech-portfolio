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
})();
