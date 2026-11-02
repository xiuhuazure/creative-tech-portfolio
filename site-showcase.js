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
    'vsl': {
      title: 'Soul Oracle Kickstarter launch VSL', date: 'Earth Moon Magick · Freelance',
      tech: ['Premiere Pro', 'Long-form video'],
      desc: 'A video sales letter for Earth Moon Magick’s Soul Oracle Kickstarter launch: a long-form edit that walks viewers through the deck and the offer.',
      media: { yt: 'UuSD2wWrmIg' },
      links: [['Watch on YouTube ↗', 'https://youtu.be/UuSD2wWrmIg'], ['See all videos', 'work.html#videos']]
    },
    'saru': {
      title: 'Dr. Saru Bala’s most viewed', date: 'Doctor’s Making Videos agency',
      tech: ['Video editing', 'Long-form video'],
      desc: 'My most-viewed edit, made while I was with the Doctor’s Making Videos agency.',
      media: { yt: '5hth3DJgcEw' },
      links: [['Watch on YouTube ↗', 'https://youtu.be/5hth3DJgcEw'], ['See all videos', 'work.html#videos']]
    },
    'amethyst': {
      title: 'Amethyst lamp ad', date: 'Trial design · Crystal brand',
      tech: ['Ad design', 'Instagram'],
      desc: 'A trial design for a crystal brand: a product ad with a bold headline and benefit callouts.',
      media: { img: 'media/design-amethyst.webp', alt: 'Amethyst lamp ad design', contain: true },
      links: [['See all designs', 'work.html#designs']]
    },
    'bracelet': {
      title: 'Protection bracelet ad', date: 'Trial design · Crystal brand',
      tech: ['Ad design', 'Instagram'],
      desc: 'A trial design for the same brand: a punchy headline ad with three benefit icons.',
      media: { img: 'media/design-bracelet.webp', alt: 'Protection bracelet ad design', contain: true },
      links: [['See all designs', 'work.html#designs']]
    },
    'agency': {
      title: 'AI agency offer post', date: 'Test design · AI agency',
      tech: ['Social post', 'Instagram'],
      desc: 'A test design for an AI agency: a text-led offer post with a clear call to action.',
      media: { img: 'media/design-agency.webp', alt: 'AI agency offer post design', contain: true },
      links: [['See all designs', 'work.html#designs']]
    },
    'portfolio': {
      title: 'This portfolio website', date: '2026 · Personal project',
      tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare', 'Claude'],
      desc: 'The site you’re on: hand-written HTML, CSS and JavaScript with a lantern dark and light switch, scroll motion, glass folders and layouts that fit phones up to 27-inch screens. Built with Claude and deployed on Cloudflare.',
      media: { img: 'media/portfolio-site.jpg', alt: 'Kimberly Yu portfolio homepage' },
      links: [['See all works', 'work.html']]
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
    if (m.yt) media = '<iframe src="https://www.youtube-nocookie.com/embed/' + m.yt + '?autoplay=1&amp;mute=1&amp;playsinline=1&amp;rel=0" title="' + esc(p.title) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    else if (m.video) media = '<video src="' + m.video + '" poster="' + (m.poster || '') + '" autoplay muted loop playsinline aria-label="' + esc(p.title) + '"></video>';
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

  /* ------------------------------ 3. Project folders ------------------------------
     Glass folders scroll over the big pinned title. Each one tilts and settles as it passes
     the middle of the screen. Hover (or tap) a folder and its files rise and fan out of it;
     on touch screens a folder also opens by itself while it's in the middle of the screen. */
  var folders = [].slice.call(document.querySelectorAll('.pf-folder'));
  if (!folders.length) return;
  var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var setOpen = function (f, on) { f.classList.toggle('is-open', on); f.setAttribute('aria-expanded', on); };
  folders.forEach(function (f) {
    f.setAttribute('aria-expanded', 'false');
    if (canHover) {
      f.addEventListener('mouseenter', function () { setOpen(f, true); });
      f.addEventListener('mouseleave', function () { if (!f.contains(document.activeElement)) setOpen(f, false); });
    }
    f.addEventListener('focusin', function () { setOpen(f, true); });
    f.addEventListener('focusout', function (e) { if (!f.contains(e.relatedTarget) && !(canHover && f.matches(':hover'))) setOpen(f, false); });
    // A tap on a closed folder (or on one of its files) opens the folder first
    f.addEventListener('click', function (e) {
      if (f.classList.contains('is-open')) return;
      e.preventDefault(); e.stopPropagation();
      folders.forEach(function (o) { if (o !== f) setOpen(o, false); });
      setOpen(f, true);
    }, true);
  });
  document.addEventListener('click', function (e) {
    if (canHover || e.target.closest('.pf-folder') || dlg.open) return;
    folders.forEach(function (o) { setOpen(o, false); });
  });
  if (reduce) return;

  var ticking = false, clamp1 = function (v) { return v < -1 ? -1 : v > 1 ? 1 : v; };
  var render = function () {
    ticking = false;
    var vh = window.innerHeight;
    folders.forEach(function (f) {
      var r = f.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var d = clamp1(((r.top + r.height / 2) - vh / 2) / (vh * 0.75)); // -1 above … 0 centred … 1 below
      var tilt = parseFloat(f.dataset.tilt) || 0, k = Math.abs(d);
      var w = f.querySelector('.pf-move');
      w.style.transform = 'translateY(' + (d * 46).toFixed(1) + 'px) rotate(' + (tilt * (1 + d * 0.9)).toFixed(2) + 'deg) scale(' + (1 - k * 0.1).toFixed(3) + ')';
      w.style.opacity = (1 - Math.max(0, d - 0.55) * 1.6).toFixed(3);
      if (!canHover && !f.contains(document.activeElement)) setOpen(f, k < 0.2);
    });
  };
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  render();
})();
