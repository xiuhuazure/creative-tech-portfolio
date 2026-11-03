/* =========================================================================
   Certifications & badges (About page). Styles in site-certs.css.
   - Each holder tilts and straightens as it rises up the screen (like the
     homepage folders) while the big title pins and fades behind them.
   - Hover (or focus) swings the cover open; on touch screens the holder in
     the middle of the screen opens by itself.
   - Clicking a holder opens its details in the shared project dialog
     (site-showcase.js), so load that file first.
   To fill in a real certificate: edit its entry in CERTS below (and the cover
   text or logo in about.html).
   ========================================================================= */
(function () {
  var sec = document.querySelector('.cb');
  if (!sec) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Details shown in the pop-up. Placeholders for now. */
  var ph = function (n, badge) {
    return {
      title: '[Certificate name ' + n + ']', date: '[Issuer] · [Month Year]',
      tech: badge ? ['[Skill]', '[Skill]', 'Credly badge'] : ['[Skill]', '[Skill]'],
      desc: '[What this certification covers and what you learned.] [Credential ID]' + (badge ? ' [The Verify on Credly link goes here.]' : ''),
      media: { ph: badge ? '🏅' : '📜', text: '[Certificate image]' },
      links: []
    };
  };
  var CERTS = {
    'cert-1': ph(1, true), 'cert-2': ph(2, false), 'cert-3': ph(3, true),
    'cert-4': ph(4, false), 'cert-5': ph(5, true), 'cert-6': ph(6, false)
  };
  if (window.siteProjects) window.siteProjects.add(CERTS);

  var holders = [].slice.call(sec.querySelectorAll('.ch'));
  var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var setOpen = function (h, on) { h.classList.toggle('is-open', on); };
  holders.forEach(function (h) {
    if (canHover) {
      h.addEventListener('mouseenter', function () { setOpen(h, true); });
      h.addEventListener('mouseleave', function () { if (document.activeElement !== h) setOpen(h, false); });
    }
    h.addEventListener('focus', function () { setOpen(h, true); });
    h.addEventListener('blur', function () { if (!(canHover && h.matches(':hover'))) setOpen(h, false); });
    h.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.siteProjects) window.siteProjects.open(h.dataset.cert, h);
    });
  });

  var word = sec.querySelector('.cb-word'), ticking = false;
  var render = function () {
    ticking = false;
    var vh = window.innerHeight;
    // title: solid until it pins, then fades over the next 40% of a screen
    if (word) {
      var pin = parseFloat(getComputedStyle(word).top) || 0;
      var natural = sec.getBoundingClientRect().top + (parseFloat(getComputedStyle(sec).paddingTop) || 0);
      var k = (pin - natural) / (vh * 0.4); k = k < 0 ? 0 : k > 1 ? 1 : k;
      word.style.setProperty('--cb-a', (1 - 0.87 * k).toFixed(3));
    }
    // on touch screens only the holder closest to the middle of the screen opens
    var best = null, bestD = 0.22;
    if (!canHover) holders.forEach(function (h) { var r = h.getBoundingClientRect(), d = Math.abs((r.top + r.height / 2) / vh - 0.5); if (d < bestD) { bestD = d; best = h; } });
    holders.forEach(function (h) {
      var r = h.getBoundingClientRect();
      if (!canHover && document.activeElement !== h) setOpen(h, h === best);
      if (r.bottom < -200 || r.top > vh + 400) return;
      if (!reduce) {
        // starts at its tilt and straightens as its top rises from the bottom of the screen to 60% up
        var t = (r.top - vh * 0.6) / (vh * 0.39); t = t < 0 ? 0 : t > 1 ? 1 : t;
        h.querySelector('.ch-move').style.transform = 'rotate(' + ((parseFloat(h.dataset.tilt) || 0) * t).toFixed(2) + 'deg)';
      }
    });
  };
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(render); } }, { passive: true });
  window.addEventListener('resize', render);
  render();
})();
