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
    'emm-ads': { tall: true,
      title: 'Earth Moon Magick — Video ads', date: 'Dec 2025 – Present · Freelance',
      tech: ['Premiere Pro', 'Meta Business Suite', 'Canva'],
      desc: 'Meta video ads built from UGC and product footage, with B-roll, motion text and audio design, plus graphic design and feed and story content for Instagram.',
      media: { video: 'media/emm-ad.mp4', poster: 'media/emm-ad.jpg' },
      links: [['Meta Ad Library ↗', 'https://www.facebook.com/ads/library/?id=1704592681676485'], ['Instagram ↗', 'https://www.instagram.com/earthmoonmagick_']]
    },
    'vsl': {
      title: 'Soul Oracle Kickstarter launch VSL', date: 'Earth Moon Magick · Freelance',
      tech: ['Premiere Pro', 'Long-form video'],
      desc: 'A video sales letter for Earth Moon Magick’s Soul Oracle Kickstarter launch: a long-form edit that walks viewers through the deck and the offer.',
      media: { yt: 'UuSD2wWrmIg' },
      links: [['Watch on YouTube ↗', 'https://youtu.be/UuSD2wWrmIg']]
    },
    'saru': {
      title: 'Dr. Saru Bala’s most viewed', date: 'Doctor’s Making Videos agency',
      tech: ['Video editing', 'Long-form video'],
      desc: 'My most-viewed edit, made while I was with the Doctor’s Making Videos agency.',
      media: { yt: '5hth3DJgcEw' },
      links: [['Watch on YouTube ↗', 'https://youtu.be/5hth3DJgcEw']]
    },
    'amethyst': {
      title: 'Amethyst lamp ad', date: 'Trial design · Crystal brand',
      tech: ['Ad design', 'Instagram'],
      desc: 'A trial design for a crystal brand: a product ad with a bold headline and benefit callouts.',
      media: { img: 'media/design-amethyst.webp', alt: 'Amethyst lamp ad design', contain: true },
      links: []
    },
    'bracelet': {
      title: 'Protection bracelet ad', date: 'Trial design · Crystal brand',
      tech: ['Ad design', 'Instagram'],
      desc: 'A trial design for the same brand: a punchy headline ad with three benefit icons.',
      media: { img: 'media/design-bracelet.webp', alt: 'Protection bracelet ad design', contain: true },
      links: []
    },
    'agency': {
      title: 'AI agency offer post', date: 'Test design · AI agency',
      tech: ['Social post', 'Instagram'],
      desc: 'A test design for an AI agency: a text-led offer post with a clear call to action.',
      media: { img: 'media/design-agency.webp', alt: 'AI agency offer post design', contain: true },
      links: []
    },
    'dailyrituals': {
      title: 'Daily Rituals carousel', date: 'Trial design · Instagram page',
      tech: ['Instagram carousel', 'Product design'],
      desc: 'A trial two-slide carousel for the Instagram page Daily Rituals: a script-and-serif hook slide, then the product with its benefits laid out around it.',
      media: { img: 'media/design-dailyrituals.webp', alt: 'Daily Rituals carousel: the hook slide and the product benefits slide', contain: true },
      links: []
    },
    'portfolio': {
      title: 'This portfolio website', date: '2026 · Personal project',
      tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare', 'Claude'],
      desc: 'The site you’re on: hand-written HTML, CSS and JavaScript with a lantern dark and light switch, scroll motion, glass folders and layouts that fit phones up to 27-inch screens. Built with Claude and deployed on Cloudflare.',
      media: { img: 'media/portfolio-site.jpg', alt: 'Kimberly Yu portfolio homepage' },
      links: []
    },
    'fslames': { tall: true,
      title: 'FSLAMES: Filipino Sign Language Automated Mobile Education System', date: '2025 – 2026 · Thesis',
      tech: ['Flutter', 'Python', 'MediaPipe', 'TensorFlow'],
      desc: 'A Filipino Sign Language learning app with ML-based sign recognition. I handled backend development and documentation, designed app interfaces, assisted Android development, and helped collect the training dataset.',
      media: { img: 'media/fslames-mockup-dark.jpg', imgLight: 'media/fslames-mockup-light.jpg', alt: 'FSLAMES app screens: practice map, sign feedback and home' },
      links: []
    },
    'ueat': { tall: true,
      title: 'U-Eat Ordering System', date: '2024 – 2025 · Group project',
      tech: ['Kotlin', 'Firebase', 'Android Studio'],
      desc: 'An Android canteen-ordering system with two apps: one for customers to order and one for stall owners to manage orders. I prototyped the interfaces in Kotlin and prepared the technical documentation.',
      media: { ph: '🍱', text: '[U-Eat app screenshots]' },
      links: [['User app ↗', 'https://github.com/mr-dj123/UEatUser'], ['Stall owner app ↗', 'https://github.com/mr-dj123/UEatStallOwner']]
    },
    'counter': { tall: true,
      title: 'Simple Counter Android App', date: '2025 · School activity',
      tech: ['Kotlin', 'Android Studio'],
      desc: 'A counter app with plus, minus and reset buttons and a quit option, built in Kotlin in Android Studio.',
      media: { img: 'media/counter-app.webp', alt: 'Simple Counter app screen', contain: true },
      links: [['View on GitHub ↗', 'https://github.com/xiuhuazure/Simple-Counter-App']]
    }
  };
  /* Extra cards shown in a folder's dialog after its project files: links that open elsewhere.
     A folder picks a list with data-extra="…" in index.html. */
  var AD = 'Short-form video ad for Earth Moon Magick on Facebook and Instagram.';
  var EXTRAS = {
    'meta-ads': [
      { title: 'Meta ad 01', sub: 'Earth Moon Magick · Meta ad', desc: AD, go: 'View the ad ↗', href: 'https://www.facebook.com/ads/library/?id=1704592681676485' },
      { title: 'Meta ad 02', sub: 'Earth Moon Magick · Meta ad', desc: AD, go: 'View the ad ↗', href: 'https://www.facebook.com/ads/library/?id=2277647252773671' },
      { title: 'Meta ad 03', sub: 'Earth Moon Magick · Meta ad', desc: AD, go: 'View the ad ↗', href: 'https://www.facebook.com/ads/library/?id=1617862633244058' },
      { title: 'Meta ad 04', sub: 'Earth Moon Magick · Meta ad', desc: AD, go: 'View the ad ↗', href: 'https://www.facebook.com/ads/library/?id=1074319012100141' },
      { title: 'Meta ad 05', sub: 'Earth Moon Magick · Meta ad', desc: AD, go: 'View the ad ↗', href: 'https://www.facebook.com/ads/library/?id=2106932693517342' },
      { title: 'Instagram post', sub: 'Earth Moon Magick · Instagram', desc: 'A short-form video I edited for Earth Moon Magick’s Instagram.', go: 'View on Instagram ↗', href: 'https://www.instagram.com/p/DcTGon8yxs2/' }
    ]
  };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

  /* ------------------------------ 2. Project dialog ------------------------------ */
  var dlg = document.createElement('dialog');
  dlg.className = 'pd'; dlg.setAttribute('aria-labelledby', 'pd-title');
  document.body.appendChild(dlg);
  var fromEl = null, closing = null, opening = null;
  var EASE_IN = 'cubic-bezier(.05, .7, .1, 1)', EASE_OUT = 'cubic-bezier(.3, 0, .8, .15)';

  var fromCard = function (el, box) {
    var c = el.getBoundingClientRect(), d = (box || dlg).getBoundingClientRect();
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
    else if (m.img && m.imgLight) media = '<img class="only-dark" src="' + m.img + '" alt="' + esc(m.alt || p.title) + '"><img class="only-light" src="' + m.imgLight + '" alt="' + esc(m.alt || p.title) + '">'; // follows the site theme
    else if (m.img) media = '<img src="' + m.img + '" alt="' + esc(m.alt || p.title) + '">';
    else media = '<div class="fw-ph"><div><b>' + m.ph + '</b>' + esc(m.text) + '</div></div>';
    // Landscape and square content: picture on top, details below. Portrait (video ads, phone apps): side by side.
    dlg.classList.toggle('is-wide', !p.tall);
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

  // Other pages (like About's certificate holders) add their own entries and reuse this dialog
  window.siteProjects = { add: function (o) { for (var k in o) PROJECTS[k] = o[k]; }, open: openProject };

  /* ------------------------------ 3. Folder dialog ------------------------------
     Clicking a folder opens its files as a row of cards in a glass panel in the middle of the
     screen (scrolls sideways). It grows out of the folder and shrinks back into it on close.
     A card opens that project's dialog on top. */
  var pt = document.createElement('dialog');
  pt.className = 'pt'; pt.setAttribute('aria-labelledby', 'pt-title');
  document.body.appendChild(pt);
  var ptFrom = null, ptClosing = null, ptOpening = null;
  var openFolder = function (f) {
    if (ptClosing) { ptClosing.onfinish = null; ptClosing.cancel(); ptClosing = null; }
    if (pt.open) pt.close();
    ptFrom = f;
    var label = f.querySelector('.pf-label');
    var ids = [].map.call(f.querySelectorAll('.pf-file'), function (a) { return a.dataset.project; }).filter(function (id) { return PROJECTS[id]; });
    pt.innerHTML =
      '<div class="pt-panel" tabindex="-1" autofocus>' +
        '<button class="pt-x" type="button" aria-label="Close">✕</button>' +
        '<div class="pt-track" tabindex="0" aria-label="Files">' + ids.map(function (id, i) {
          var p = PROJECTS[id];
          return '<a class="pt-card" href="#projects" data-project="' + id + '" aria-haspopup="dialog" style="--i:' + i + '">' +
            '<strong>' + esc(p.title) + '</strong><span class="pt-sub">' + esc(p.date) + '</span><hr><p>' + esc(p.desc) + '</p></a>';
        }).join('') + (EXTRAS[f.dataset.extra] || []).map(function (x, i) {
          return '<a class="pt-card is-link" href="' + x.href + '" target="_blank" rel="noopener" style="--i:' + (ids.length + i) + '">' +
            '<strong>' + esc(x.title) + '</strong><span class="pt-sub">' + esc(x.sub) + '</span><hr><p>' + esc(x.desc) + '</p><span class="pt-go">' + esc(x.go) + '</span></a>';
        }).join('') + '</div>' +
        '<div class="pt-strip"><span class="pt-label" id="pt-title">' + esc(label ? label.textContent : 'files') + '</span></div>' +
      '</div>';
    pt.querySelector('.pt-x').addEventListener('click', function (e) { e.stopPropagation(); closeFolder(); });
    pt.querySelectorAll('.pt-card[data-project]').forEach(function (c) {
      c.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); openProject(c.dataset.project, c); });
    });
    var track = pt.querySelector('.pt-track');
    track.addEventListener('wheel', function (e) { // a normal mouse wheel scrolls the row sideways
      if (track.scrollWidth <= track.clientWidth + 1 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault(); track.scrollLeft += e.deltaY;
    }, { passive: false });
    pt.showModal();
    if (!reduce && pt.animate) {
      ptOpening = pt.animate([{ transform: fromCard(f, pt), opacity: 0.2 }, { transform: 'none', opacity: 1 }], { duration: 480, easing: EASE_IN });
    }
  };
  var closeFolder = function () {
    if (!pt.open || ptClosing) return;
    var back = ptFrom;
    var done = function () { pt.close(); pt.innerHTML = ''; if (back) { var a = back.querySelector('.pf-file'); if (a) a.focus({ preventScroll: true }); } };
    if (reduce || !pt.animate) return done();
    if (ptOpening) { ptOpening.cancel(); ptOpening = null; }
    pt.classList.add('is-closing');
    var a = ptClosing = pt.animate([{ transform: 'none', opacity: 1 }, { transform: back ? fromCard(back, pt) : 'scale(0.9)', opacity: 0 }], { duration: 320, easing: EASE_OUT, fill: 'forwards' });
    a.onfinish = function () { if (ptClosing !== a) return; ptClosing = null; pt.classList.remove('is-closing'); done(); a.cancel(); };
  };
  pt.addEventListener('cancel', function (e) { e.preventDefault(); closeFolder(); });
  pt.addEventListener('click', function (e) {
    if (ptClosing) { var a = ptClosing; ptClosing = null; a.onfinish = null; a.cancel(); pt.classList.remove('is-closing'); pt.close(); pt.innerHTML = ''; return; }
    if (e.target === pt) closeFolder(); // tap outside the panel
  });

  /* ------------------------------ 4. Project folders ------------------------------
     Glass folders scroll over the big pinned title, straightening as they come up the screen.
     Hover a folder and its files pop up and splay out while the glass front leans; on touch
     screens the folder in the middle of the screen does this by itself. Clicking the folder
     opens the folder dialog; clicking a file that's sticking out opens that project. */
  var folders = [].slice.call(document.querySelectorAll('.pf-folder'));
  if (!folders.length) return;

  // The big title starts solid, then fades into the background once it pins and the folders
  // begin sliding over it (over the next 40% of a screen of scrolling).
  var pfSec = document.querySelector('.pf'), pfWord = document.querySelector('.pf-word');
  if (pfSec && pfWord) {
    var wordTick = false;
    var wordFade = function () {
      wordTick = false;
      var vh = window.innerHeight, pin = parseFloat(getComputedStyle(pfWord).top) || 0;
      var natural = pfSec.getBoundingClientRect().top + (parseFloat(getComputedStyle(pfSec).paddingTop) || 0); // where the title sits before it pins
      var k = (pin - natural) / (vh * 0.4); k = k < 0 ? 0 : k > 1 ? 1 : k;
      pfWord.style.setProperty('--pf-a', (1 - 0.87 * k).toFixed(3));
    };
    window.addEventListener('scroll', function () { if (!wordTick) { wordTick = true; requestAnimationFrame(wordFade); } }, { passive: true });
    window.addEventListener('resize', wordFade);
    wordFade();
  }
  var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var setOpen = function (f, on) { f.classList.toggle('is-open', on); f.setAttribute('aria-expanded', on); };
  folders.forEach(function (f) {
    f.setAttribute('aria-expanded', 'false');
    f.setAttribute('aria-haspopup', 'dialog');
    if (canHover) {
      f.addEventListener('mouseenter', function () { setOpen(f, true); });
      f.addEventListener('mouseleave', function () { if (!f.contains(document.activeElement)) setOpen(f, false); });
    }
    f.addEventListener('focusin', function () { setOpen(f, true); });
    f.addEventListener('focusout', function (e) { if (!f.contains(e.relatedTarget) && !(canHover && f.matches(':hover'))) setOpen(f, false); });
    f.addEventListener('click', function (e) {
      if (e.target.closest('.pf-file') && f.classList.contains('is-open')) return; // the file's own handler opens it
      e.preventDefault(); e.stopPropagation();
      openFolder(f);
    }, true);
  });
  if (reduce) return;

  // Each folder starts at its tilt and straightens as its top rises from the bottom of the
  // screen to 60% of the way up (the same curve convodesign101 uses), then stays straight.
  var ticking = false;
  var render = function () {
    ticking = false;
    var vh = window.innerHeight;
    folders.forEach(function (f) {
      var r = f.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 400) return;
      var k = (r.top - vh * 0.6) / (vh * 0.39); k = k < 0 ? 0 : k > 1 ? 1 : k;
      f.querySelector('.pf-move').style.transform = 'rotate(' + ((parseFloat(f.dataset.tilt) || 0) * k).toFixed(2) + 'deg)';
      if (!canHover && !f.contains(document.activeElement)) { var c = (r.top + r.height / 2) / vh; setOpen(f, c > 0.3 && c < 0.7); }
    });
  };
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(render); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  render();
})();
