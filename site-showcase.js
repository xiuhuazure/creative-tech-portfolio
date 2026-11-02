/* =========================================================================
   Homepage showcase: featured-work tabs, the project folder's scroll motion,
   and the project dialog. Styles in site-showcase.css.
   ========================================================================= */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------ Projects (dialog content) ------------------------------ */
  var PROJECTS = {
    'emm-store': {
      title: 'Earth Moon Magick — Storefront', date: 'Dec 2025 – Present · Freelance',
      tech: ['Shopify', 'Liquid', 'GemPages', 'HTML / CSS'],
      desc: 'Shopify Technical Specialist for a spiritual and wellness brand. I build blog and new product pages in GemPages, make theme edits in Shopify Liquid, HTML and CSS, and manage product listings, variants and media galleries.',
      media: { img: 'media/emm-site.webp', alt: 'Earth Moon Magick homepage' },
      links: [['Read the case study', 'case-study.html'], ['Visit the store ↗', 'https://earthmoonmagick.com/']]
    },
    'emm-ads': {
      title: 'Earth Moon Magick — Video ads', date: 'Dec 2025 – Present · Freelance',
      tech: ['Premiere Pro', 'Meta Business Suite', 'Canva'],
      desc: 'Meta video ads built from UGC and product footage, with B-roll, motion text and audio design, plus graphic design and feed and story content for Instagram.',
      media: { video: 'media/emm-ad.mp4', poster: 'media/emm-ad.jpg' },
      links: [['See all videos', 'work.html#videos']]
    },
    'designs': {
      title: 'Graphic design', date: 'Trial & test work',
      tech: ['Ad design', 'Instagram posts'],
      desc: 'Trial designs for a crystal brand (an amethyst lamp ad and a protection bracelet ad) and a test offer post for an AI agency: bold headlines, product focus and clear calls to action.',
      media: { img: 'media/design-amethyst.webp', alt: 'Amethyst lamp ad design' },
      links: [['See the designs', 'work.html#designs']]
    },
    'fslames': {
      title: 'FSLAMES', date: '2025 – 2026 · Thesis',
      tech: ['Flutter', 'Python', 'MediaPipe', 'TensorFlow'],
      desc: 'Filipino Sign Language Automated Mobile Education System: a learning app with ML-based sign recognition. I handled backend development and documentation, designed app interfaces, assisted Android development, and helped collect the training dataset.',
      media: { ph: '🤟', text: '[FSLAMES app screenshots]' },
      links: [['View on GitHub ↗', 'https://github.com/mr-dj123/fslames-mobile-app']]
    },
    'ueat': {
      title: 'U-Eat Ordering System', date: '2024 – 2025 · Group project',
      tech: ['Kotlin', 'Firebase', 'Android Studio'],
      desc: 'An Android canteen-ordering system with two apps: one for customers to order and one for stall owners to manage orders. I prototyped the interfaces in Kotlin and prepared the technical documentation.',
      media: { ph: '🍱', text: '[U-Eat app screenshots]' },
      links: [['User app ↗', 'https://github.com/mr-dj123/UEatUser'], ['Stall owner app ↗', 'https://github.com/mr-dj123/UEatStallOwner']]
    },
    'counter': {
      title: 'Simple Counter Android App', date: '2025 · School activity',
      tech: ['Kotlin', 'Android Studio'],
      desc: 'A counter app with plus, minus and reset buttons and a quit option, built in Kotlin in Android Studio.',
      media: { img: 'media/counter-app.webp', alt: 'Simple Counter app screen', contain: true },
      links: [['View on GitHub ↗', 'https://github.com/xiuhuazure/Simple-Counter-App']]
    }
  };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

  /* ------------------------------ 1. Featured work tabs ------------------------------ */
  var fw = document.querySelector('.fw');
  if (fw) {
    var tabs = [].slice.call(fw.querySelectorAll('.fw-tab[role="tab"]'));
    var show = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab, panel = document.getElementById(t.getAttribute('aria-controls'));
        t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
        if (!panel) return;
        panel.hidden = !on;
        if (on && !reduce) { panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering'); }
        panel.querySelectorAll('video').forEach(function (v) { if (on) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); });
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (k) { e.preventDefault(); show(tabs[(i + k + tabs.length) % tabs.length], true); }
      });
    });
  }

  /* ------------------------------ 2. Project dialog ------------------------------ */
  var dlg = document.createElement('dialog');
  dlg.className = 'pd'; dlg.setAttribute('aria-labelledby', 'pd-title');
  document.body.appendChild(dlg);
  var fromEl = null, closing = null, opening = null;
  var EASE_IN = 'cubic-bezier(.05, .7, .1, 1)', EASE_OUT = 'cubic-bezier(.3, 0, .8, .15)';

  var fromCard = function (el) {
    var c = el.getBoundingClientRect(), d = dlg.getBoundingClientRect();
    return 'translate(' + ((c.left + c.width / 2) - (d.left + d.width / 2)) + 'px,' + ((c.top + c.height / 2) - (d.top + d.height / 2)) + 'px) scale(' +
      Math.max(0.2, c.width / d.width) + ',' + Math.max(0.2, c.height / d.height) + ')';
  };
  var openProject = function (id, el) {
    var p = PROJECTS[id]; if (!p) return;
    stopClosing(); // a new tap ends any close that's still animating
    if (dlg.open) dlg.close();
    fromEl = el;
    var m = p.media, media;
    if (m.video) media = '<video src="' + m.video + '" poster="' + (m.poster || '') + '" autoplay muted loop playsinline aria-label="' + esc(p.title) + '"></video>';
    else if (m.img) media = '<img src="' + m.img + '" alt="' + esc(m.alt || p.title) + '">';
    else media = '<div class="fw-ph"><div><b>' + m.ph + '</b>' + esc(m.text) + '</div></div>';
    dlg.innerHTML =
      '<button class="pd-x" type="button" aria-label="Close">✕</button>' +
      '<div class="pd-inner">' +
        '<div class="pd-media' + (m.contain ? ' is-contain' : '') + '">' + media + '</div>' +
        '<div class="pd-info">' +
          '<p class="pd-date pd-in">' + esc(p.date) + '</p>' +
          '<h2 class="pd-title pd-in" id="pd-title">' + esc(p.title) + '</h2>' +
          '<div class="pd-tech pd-in">' + p.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
          '<p class="pd-desc pd-in">' + esc(p.desc) + '</p>' +
          '<div class="pd-actions pd-in">' + p.links.map(function (l) {
            var ext = /^https?:/.test(l[1]); return '<a href="' + l[1] + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(l[0]) + '</a>';
          }).join('') + '<button class="pd-close-btn" type="button">Close</button></div>' +
        '</div>' +
      '</div>';
    dlg.querySelectorAll('.pd-x, .pd-close-btn').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); closeProject(); }); });
    var v = dlg.querySelector('video'); if (v) { v.muted = true; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
    dlg.classList.remove('is-closing');
    dlg.showModal();
    if (!reduce && dlg.animate && el) {
      opening = dlg.animate([{ transform: fromCard(el), opacity: 0.2, borderRadius: '14px' }, { transform: 'none', opacity: 1, borderRadius: '28px' }],
        { duration: 480, easing: EASE_IN });
    }
  };
  // Closing: shrink back toward the file it came from, then close. A newer open cancels it outright.
  var stopClosing = function () {
    if (!closing) return;
    closing.onfinish = null; closing.cancel(); closing = null; dlg.classList.remove('is-closing');
  };
  var closeProject = function () {
    if (!dlg.open || closing) return;
    var back = fromEl;
    var done = function () { dlg.classList.remove('is-closing'); dlg.close(); dlg.innerHTML = ''; if (back) back.focus({ preventScroll: true }); };
    if (reduce || !dlg.animate) return done();
    if (opening) { opening.cancel(); opening = null; } // closing mid-open starts from where it is now
    dlg.classList.add('is-closing');
    var target = back && back.getBoundingClientRect().width ? fromCard(back) : 'translateY(24px) scale(0.9)';
    var a = closing = dlg.animate([{ transform: 'none', opacity: 1 }, { transform: target, opacity: 0 }], { duration: 300, easing: EASE_OUT, fill: 'forwards' });
    a.onfinish = function () { if (closing !== a) return; closing = null; done(); a.cancel(); };
  };
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); closeProject(); });   // Esc
  dlg.addEventListener('click', function (e) {
    if (closing) {
      // A tap while it's still shrinking away: finish closing now and pass the tap to the file underneath.
      e.preventDefault();
      var a = closing; closing = null; a.onfinish = null; a.cancel();
      dlg.classList.remove('is-closing'); dlg.close(); dlg.innerHTML = '';
      var under = document.elementFromPoint(e.clientX, e.clientY);
      var card = under && under.closest('[data-project]');
      if (card && PROJECTS[card.dataset.project]) openProject(card.dataset.project, card);
      return;
    }
    if (e.target === dlg) closeProject();  // tap outside
  });

  document.querySelectorAll('[data-project]').forEach(function (el) {
    el.addEventListener('click', function (e) { if (PROJECTS[el.dataset.project]) { e.preventDefault(); openProject(el.dataset.project, el); } });
  });

  /* ------------------------------ 3. Project folder: scroll motion ------------------------------ */
  var pf = document.querySelector('.pf');
  if (!pf) return;
  var stage = pf.querySelector('.pf-stage'), head = pf.querySelector('.pf-head'), hint = pf.querySelector('.pf-hint');
  var cards = [].slice.call(pf.querySelectorAll('.pf-card'));
  var back = document.createElement('div'); back.className = 'pf-back'; back.setAttribute('aria-hidden', 'true');
  var tray = document.createElement('div'); tray.className = 'pf-tray'; tray.setAttribute('aria-hidden', 'true');
  var front = document.createElement('div'); front.className = 'pf-front'; front.setAttribute('aria-hidden', 'true');
  front.innerHTML = '<span class="pf-label">projects</span>';
  stage.appendChild(back); stage.appendChild(tray); stage.appendChild(front);
  pf.classList.add('pf-js');
  if (reduce) pf.classList.add('pf-static');

  var L = null, ticking = false;
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var CW = 210, CH = 248; // base card size (matches the CSS)

  var layout = function () {
    var W = stage.clientWidth, n = cards.length, H = reduce ? 0 : stage.clientHeight;
    // Final tray: a row on wide screens, a grid on narrow ones
    var trayW = Math.min(W - 32, 1240), gap = 14, padX = 24;
    var cols = (trayW - padX * 2 - (n - 1) * gap) / n >= 150 ? n : (W >= 700 ? 3 : 2);
    var cw = Math.min(CW, (trayW - padX * 2 - (cols - 1) * gap) / cols), ch = cw * CH / CW;
    var rows = Math.ceil(n / cols);
    var gridH = rows * ch + (rows - 1) * gap, trayH = gridH + 24 + 44;
    if (reduce) { H = trayH + 160 + (head ? head.offsetHeight : 0); stage.style.height = H + 'px'; }
    var maxTray = H - 120;
    if (trayH > maxTray) { var k = maxTray / trayH; cw *= k; ch *= k; gridH = rows * ch + (rows - 1) * gap; trayH = gridH + 24 + 44; }
    var trayX = (W - trayW) / 2, trayY = reduce ? H - trayH - 40 : Math.max(84, (H - trayH) / 2 + H * 0.06);
    var finals = cards.map(function (_, i) {
      var r = Math.floor(i / cols), c = i % cols, inRow = Math.min(cols, n - r * cols);
      var rowW = inRow * cw + (inRow - 1) * gap, x0 = trayX + (trayW - rowW) / 2;
      return { x: x0 + c * (cw + gap), y: trayY + 24 + r * (ch + gap), r: 0, s: cw / CW };
    });
    // Folder (closed and fanned)
    var fw0 = Math.min(460, W * 0.82), fh = fw0 * 0.62, fx = (W - fw0) / 2, fy = H * 0.5;
    var bs = Math.min(1, (fw0 * 0.46) / CW), bw = CW * bs, bh = CH * bs, cx = W / 2;
    var closed = cards.map(function (_, i) {
      var o = i < 3 ? (i - 1) * bw * 0.3 : 0;
      return { x: cx + o - bw / 2, y: fy + fh * 0.1, r: i < 3 ? (i - 1) * 3 : 0, s: bs * 0.94 };
    });
    var fanX = [-0.62, 0, 0.62], fanY = [0.38, 0.56, 0.4], fanR = [-9, 0, 8];
    var fan = cards.map(function (_, i) {
      if (i < 3) return { x: cx + fanX[i] * bw - bw / 2, y: fy - fanY[i] * bh, r: fanR[i], s: bs };
      return { x: cx - bw / 2 + (i - 4) * 10, y: fy + fh * 0.04, r: (i - 4) * 2, s: bs };
    });
    L = { W: W, H: H, fx: fx, fy: fy, fw: fw0, fh: fh, trayX: trayX, trayY: trayY, trayW: trayW, trayH: trayH, closed: closed, fan: fan, finals: finals };
  };

  var put = function (el, x, y, w, h) { el.style.width = w + 'px'; el.style.height = h + 'px'; el.style.transform = 'translate(' + x + 'px,' + y + 'px)'; };

  var render = function () {
    ticking = false;
    if (!L) layout();
    var p = 1;
    if (!reduce) {
      var r = pf.getBoundingClientRect(), span = pf.offsetHeight - L.H;
      p = span > 0 ? clamp(-r.top / span) : 1;
    }
    var a = ease(clamp((p - 0.06) / 0.32)), b = ease(clamp((p - 0.46) / 0.36));
    cards.forEach(function (c, i) {
      var s0 = L.closed[i], s1 = L.fan[i], s2 = L.finals[i];
      var x = lerp(lerp(s0.x, s1.x, a), s2.x, b), y = lerp(lerp(s0.y, s1.y, a), s2.y, b);
      var rot = lerp(lerp(s0.r, s1.r, a), s2.r, b), s = lerp(lerp(s0.s, s1.s, a), s2.s, b);
      c.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rot + 'deg) scale(' + s + ')';
      c.classList.toggle('is-live', b > 0.98);
    });
    // Folder back fades away; the glass tray appears; the front pane becomes the tray's bottom strip
    put(back, lerp(L.fx, L.trayX, b), lerp(L.fy, L.trayY, b), lerp(L.fw, L.trayW, b), lerp(L.fh, L.trayH, b));
    back.style.opacity = 1 - b;
    put(tray, lerp(L.fx, L.trayX, b), lerp(L.fy, L.trayY, b), lerp(L.fw, L.trayW, b), lerp(L.fh, L.trayH, b));
    tray.style.opacity = b;
    var fy0 = L.fy + L.fh * 0.22, fh0 = L.fh * 0.78, sh = 58;
    var fx = lerp(L.fx, L.trayX, b), fyy = lerp(fy0, L.trayY + L.trayH - sh, b), fww = lerp(L.fw, L.trayW, b), fhh = lerp(fh0, sh, b);
    front.style.width = fww + 'px'; front.style.height = fhh + 'px';
    front.style.transform = 'translate(' + fx + 'px,' + fyy + 'px) perspective(900px) rotateX(' + (-22 * a * (1 - b)) + 'deg)';
    if (head) head.style.opacity = 1 - 0.75 * b;
    if (hint) hint.classList.toggle('is-on', b > 0.95);
  };
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
  var onResize = function () { L = null; onScroll(); };
  if (reduce) { layout(); render(); window.addEventListener('resize', function () { layout(); render(); }); return; }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onResize);
  render();
})();
