/* =========================================================================
   Site buttons — behaviour for the two swap components (see site-buttons.css).
   Ported 1:1 from the provided React code; Framer Motion's springs and
   useTransform mappings are reproduced here with a small spring simulator.
   ========================================================================= */
(function () {
  // ---------- tiny spring (mass 1), like Framer Motion's useSpring ----------
  function spring(value, stiffness, damping) { return { x: value, v: 0, target: value, k: stiffness, c: damping }; }
  function stepSpring(s, dt) {
    var a = -s.k * (s.x - s.target) - s.c * s.v;
    s.v += a * dt;
    s.x += s.v * dt;
  }
  function settled(s) { return Math.abs(s.x - s.target) < 0.01 && Math.abs(s.v) < 0.01; }
  // useTransform with clamping (Framer's default)
  function map(v, i0, i1, o0, o1) {
    var t = (v - i0) / (i1 - i0);
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    return o0 + (o1 - o0) * t;
  }

  // ---------------- Glow Button ----------------
  function initGlow(wrap) {
    var btn = wrap.querySelector('.gbtn');
    var aura = wrap.querySelector('.gbtn-aura');
    // const springConfig = { damping: 20, stiffness: 150 };
    var sx = spring(0, 150, 20), sy = spring(0, 150, 20);
    // whileTap scale 0.97 — Framer's default spring for scale
    var sc = spring(1, 550, 30);
    var raf = 0, last = 0;

    function render() {
      var X = sx.x, Y = sy.x;
      var buttonTranslateX = map(X, -150, 150, -10, 10);
      var buttonTranslateY = map(Y, -80, 80, -8, 8);
      var rotateX = map(Y, -100, 100, 8, -8);
      var rotateY = map(X, -100, 100, -8, 8);
      btn.style.transform = 'translateX(' + buttonTranslateX + 'px) translateY(' + buttonTranslateY + 'px) scale(' + sc.x +
        ') rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      var distance = Math.sqrt(X * X + Y * Y);
      var auraScale = Math.max(0.8, 1.4 - distance / 400);
      aura.style.transform = 'translateX(' + (X - 120) + 'px) translateY(' + (Y - 120) + 'px) scale(' + auraScale + ')';
    }
    function frame(t) {
      var dt = last ? Math.min((t - last) / 1000, 1 / 30) : 1 / 60;
      last = t;
      for (var i = 0; i < 4; i++) { stepSpring(sx, dt / 4); stepSpring(sy, dt / 4); stepSpring(sc, dt / 4); }
      if (settled(sx) && settled(sy) && settled(sc)) {
        sx.x = sx.target; sy.x = sy.target; sc.x = sc.target; sx.v = sy.v = sc.v = 0;
        render(); raf = 0; last = 0; return;
      }
      render();
      raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }

    // handleMouseMove
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - (rect.left + rect.width / 2);
      var y = e.clientY - (rect.top + rect.height / 2);
      sx.target = x;
      wrap.classList.add('is-hovered');
      btn.style.setProperty('--x', (e.clientX - rect.left) + 'px');
      btn.style.setProperty('--y', (e.clientY - rect.top) + 'px');
      sy.target = y;
      kick();
    });
    // handleMouseLeave
    btn.addEventListener('mouseleave', function () {
      sx.target = 0; sy.target = 0;
      wrap.classList.remove('is-hovered');
      kick();
    });
    // whileTap={{ scale: 0.97 }}
    btn.addEventListener('pointerdown', function () { sc.target = 0.97; kick(); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
      btn.addEventListener(ev, function () { sc.target = 1; kick(); });
    });
  }

  // ---------------- Circle Reveal Button ----------------
  function initCircle(btn) {
    var spot = btn.querySelector('.crbtn-spot');
    function place(e) {
      var rect = btn.getBoundingClientRect();
      spot.style.left = (e.clientX - rect.left) + 'px';
      spot.style.top = (e.clientY - rect.top) + 'px';
    }
    // handleEnter / handleLeave
    btn.addEventListener('mouseenter', function (e) { place(e); btn.classList.add('is-hovered'); });
    btn.addEventListener('mouseleave', function (e) { place(e); btn.classList.remove('is-hovered'); });
  }

  var glows = document.querySelectorAll('.gbtn-wrap');
  for (var i = 0; i < glows.length; i++) initGlow(glows[i]);
  var circles = document.querySelectorAll('.crbtn');
  for (var j = 0; j < circles.length; j++) initCircle(circles[j]);
})();
