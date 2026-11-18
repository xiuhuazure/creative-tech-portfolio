/* =========================================================================
   Homepage showcase: featured-work tabs, the project folder's scroll motion,
   and the project dialog. Styles in site-showcase.css.
   ========================================================================= */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------ Projects (dialog content) ------------------------------ */
  var PROJECTS = {
    'emm-store': {
      title: 'Earth Moon Magick: Storefront', date: 'Dec 2025 – Present · Freelance',
      tech: ['Shopify', 'Liquid', 'GemPages', 'HTML / CSS'],
      desc: 'Shopify Technical Specialist for a spiritual and wellness brand. I build blog and new product pages in GemPages, make theme edits in Shopify Liquid, HTML and CSS, and manage product listings, variants and media galleries.',
      media: { img: 'media/emm-site.webp?v=2', alt: 'Earth Moon Magick homepage' },
      links: [['Read the case study', 'case-study.html'], ['Visit the store ↗', 'https://earthmoonmagick.com/']]
    },
    'emm-ads': { tall: true,
      title: 'Earth Moon Magick: Video ads', date: 'Dec 2025 – Present · Freelance',
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
      title: 'AI agency offer ad', date: 'Test design · AI agency',
      tech: ['Social ad', 'Instagram'],
      desc: 'A test design for an AI agency: a text-led offer ad with a clear call to action.',
      media: { img: 'media/design-agency.webp', alt: 'AI agency offer ad design', contain: true },
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
      title: 'Portfolio website', date: '2026 · Personal project · Individual project',
      tech: ['HTML', 'CSS', 'JavaScript', 'Cloudflare', 'Claude'],
      desc: 'The site you’re on: hand-written HTML, CSS and JavaScript with a lantern dark and light switch, scroll motion, glass folders and layouts that fit phones up to 27-inch screens. Built with Claude and deployed on Cloudflare.',
      media: { img: 'media/portfolio-site.jpg?v=2', alt: 'Kimberly Yu portfolio website on a laptop and a phone', contain: true },
      links: []
    },
    'jonathan': {
      title: 'Jonathan Photography: Booking & portfolio system', date: '2026 · Capstone · Group project',
      tech: ['React', 'Vite', 'PHP', 'MySQL'],
      desc: 'A full-stack website my team built for a real photography studio. Clients browse the work, build a package estimate and request a date. The owner manages requests, the booking calendar, services, prices and website content from one dashboard.',
      media: { img: 'media/jonathan-photography.jpg', alt: 'Jonathan Photography booking dashboard and phone screens', contain: true },
      links: [['View on GitHub ↗', 'https://github.com/NeriVlad21/jonathan-photography']]
    },
    'barangayone': {
      title: 'BarangayONE: Barangay services platform', date: '2026 · Final requirement · Group project',
      tech: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
      desc: 'A prototype that lets residents of Brgy. Sinauna request barangay documents, track their status, and find announcements and emergency hotlines in one mobile app. Barangay staff review, approve and release every request from a web dashboard. I was the HTML coder: I built the clickable prototype and the landing page.',
      media: { img: 'media/barangayone/card.jpg', alt: 'BarangayONE staff dashboard on a laptop with the resident app on two phones', contain: true },
      links: [['View project', 'barangayone.html'], ['Landing page ↗', 'https://barangayone.pages.dev/']]
    },
    'fslames': { tall: true,
      title: 'FSLAMES: Filipino Sign Language Automated Mobile Education System', date: '2025 – 2026 · Thesis · Group project',
      tech: ['Flutter', 'Python', 'MediaPipe', 'TensorFlow'],
      desc: 'A Filipino Sign Language learning app with ML-based sign recognition. I handled backend development and documentation, designed app interfaces, assisted Android development, and helped collect the training dataset.',
      media: { img: 'media/fslames-mockup-dark.jpg', imgLight: 'media/fslames-mockup-light.jpg', alt: 'FSLAMES app screens: practice map, sign feedback and home' },
      links: [['Visit the landing page ↗', 'https://fslames.vercel.app/']]
    },
    'kidzo': { tall: true,
      title: 'Kidzo: Learning games for kids', date: '2025 · School project · Group project',
      tech: ['Kotlin', 'Android Studio', 'Firebase'],
      desc: 'An Android learning app for young kids: 25 mini-games for letters, numbers, math, shapes, colors and animals, with levels, stars and a progress page. I built 12 of the games, including the memory cards, Ice Cream Math, Grocery Store, Spelling and the sorting games.',
      media: { img: 'media/kidzo-mockup.jpg?v=3', alt: 'Kidzo app screens: the Progress page, the home screen and the Math stages' },
      links: []
    },
    'ueat': { tall: true,
      title: 'U-Eat: Canteen ordering system', date: '2025 · School project · Group project',
      tech: ['Kotlin', 'Firebase', 'Android Studio', 'UI design'],
      desc: 'Two Android apps on one Firebase backend: students browse stalls, order and pay from their phone, and stall owners manage the order queue, menu and sales. I designed the user interfaces and worked on parts of the backend, including the customer app’s cart.',
      media: { img: 'media/ueat-mockup.jpg', alt: 'U-Eat app screens: food details, the stalls home screen and the stall owner’s order queue' },
      links: []
    },
    'counter': { tall: true,
      title: 'Simple Counter Android App', date: '2025 · School activity · Individual project',
      tech: ['Kotlin', 'Android Studio'],
      desc: 'A counter app with plus, minus and reset buttons and a quit option, built in Kotlin in Android Studio.',
      media: { img: 'media/counter-app.webp', alt: 'Simple Counter app screen', contain: true },
      links: [['View on GitHub ↗', 'https://github.com/xiuhuazure/Simple-Counter-App']]
    },
    'leapyear': { tall: true,
      title: 'Leap Year Calculator Android App', date: '2025 · School activity · Individual project',
      tech: ['Kotlin', 'Android Studio'],
      desc: 'Type in a year and the app tells you right away if it’s a leap year. I wrote the conditional logic and input handling myself in Kotlin, practising the Android lifecycle and UI design.',
      media: { img: 'media/leap-year-app.webp', alt: 'Leap Year Calculator app screen', contain: true },
      links: [['View on GitHub ↗', 'https://github.com/xiuhuazure/Leap-Year-Calculator-App']]
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
  // Every project file on the page, in folder order: Previous / Next step through them all (wrapping round).
  var ORDER = [];
  document.querySelectorAll('.pf-file[data-project]').forEach(function (a) {
    var id = a.dataset.project; if (PROJECTS[id] && ORDER.indexOf(id) < 0) ORDER.push(id);
  });
  var cardFor = function (id) { return document.querySelector('.pf-file[data-project="' + id + '"]'); };
  var step = function (dir) {
    var i = ORDER.indexOf(dlg.dataset.project); if (i < 0 || !dlg.open || closing) return;
    var id = ORDER[(i + dir + ORDER.length) % ORDER.length];
    openProject(id, cardFor(id), dir);
  };
  var openProject = function (id, el, swap) {
    var p = PROJECTS[id]; if (!p) return;
    stopClosing(); // a new tap ends any close that's still animating
    swap = swap && dlg.open; // Previous / Next: change the contents in place, no close and reopen
    if (dlg.open && !swap) dlg.close();
    fromEl = el;
    var m = p.media, media;
    if (m.yt) media = '<iframe src="https://www.youtube-nocookie.com/embed/' + m.yt + '?autoplay=1&amp;mute=1&amp;playsinline=1&amp;rel=0" title="' + esc(p.title) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    else if (m.video) media = '<video src="' + m.video + '" poster="' + (m.poster || '') + '" autoplay muted loop playsinline aria-label="' + esc(p.title) + '"></video>';
    else if (m.img && m.imgLight) media = '<img class="only-dark" src="' + m.img + '" alt="' + esc(m.alt || p.title) + '"><img class="only-light" src="' + m.imgLight + '" alt="' + esc(m.alt || p.title) + '">'; // follows the site theme
    else if (m.img) media = '<img src="' + m.img + '" alt="' + esc(m.alt || p.title) + '">';
    else media = '<div class="fw-ph"><div><b>' + m.ph + '</b>' + esc(m.text) + '</div></div>';
    // Landscape and square content: picture on top, details below. Portrait (video ads, phone apps): side by side.
    dlg.classList.toggle('is-wide', !p.tall);
    dlg.dataset.project = id;
    // The picture's real shape, so phones can show it whole at its own aspect ratio
    var ar = m.yt ? 16 / 9 : m.video ? 9 / 16 : m.ph ? 3 / 4 : 1;
    var at = ORDER.indexOf(id), nav = at < 0 ? '' :
      '<div class="pd-nav">' +
        '<button class="pd-step" type="button" data-step="-1" aria-label="Previous project: ' + esc(PROJECTS[ORDER[(at - 1 + ORDER.length) % ORDER.length]].title) + '">‹</button>' +
        '<span class="pd-count" aria-hidden="true">' + (at + 1) + ' / ' + ORDER.length + '</span>' +
        '<button class="pd-step" type="button" data-step="1" aria-label="Next project: ' + esc(PROJECTS[ORDER[(at + 1) % ORDER.length]].title) + '">›</button>' +
      '</div>';
    dlg.innerHTML =
      '<button class="pd-x" type="button" aria-label="Close">✕</button>' +
      '<div class="pd-inner">' +
        '<div class="pd-media' + (m.contain ? ' is-contain' : '') + '">' + media + '</div>' +
        '<div class="pd-info">' +
          '<p class="pd-date pd-in">' + esc(p.date) + '</p>' +
          '<h2 class="pd-title pd-in" id="pd-title">' + esc(p.title) + '</h2>' +
          '<div class="pd-tech pd-in">' + p.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
          '<p class="pd-desc pd-in">' + esc(p.desc) + '</p>' +
          '<div class="pd-actions pd-in">' + nav + p.links.map(function (l) {
            var ext = /^https?:/.test(l[1]); return '<a href="' + l[1] + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(l[0]) + '</a>';
          }).join('') + '</div>' +
        '</div>' +
      '</div>';
    var mediaBox = dlg.querySelector('.pd-media');
    mediaBox.style.setProperty('--ar', ar);
    var firstImg = mediaBox.querySelector('img');
    if (firstImg) { var setAr = function () { if (firstImg.naturalWidth) mediaBox.style.setProperty('--ar', firstImg.naturalWidth / firstImg.naturalHeight); }; if (firstImg.complete) setAr(); else firstImg.addEventListener('load', setAr); }
    dlg.querySelectorAll('.pd-x').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); closeProject(); }); });
    dlg.querySelectorAll('.pd-step').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); step(+b.dataset.step); }); });
    var v = dlg.querySelector('video'); if (v) { v.muted = true; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
    dlg.classList.remove('is-closing');
    if (swap) {
      var keep = dlg.querySelector('.pd-step[data-step="' + (swap < 0 ? -1 : 1) + '"]'); if (keep) keep.focus({ preventScroll: true });
      var inner = dlg.querySelector('.pd-inner');
      if (!reduce && inner.animate) inner.animate([{ opacity: 0, transform: 'translateX(' + (swap * 28) + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE_IN });
      return;
    }
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
  dlg.addEventListener('keydown', function (e) { // ← → step through the projects
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.target.closest && e.target.closest('video, iframe, input')) return;
    e.preventDefault(); step(e.key === 'ArrowLeft' ? -1 : 1);
  });
  var tx = null, ty = 0; // swipe sideways on a phone for Previous / Next
  dlg.addEventListener('touchstart', function (e) { if (e.touches.length === 1) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } else tx = null; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (tx === null) return; var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty; tx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  }, { passive: true });
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

  /* ------------------------------ 3. Inside a folder ------------------------------
     Clicking a folder goes inside it: its glass front falls open and it moves closer, then its
     inside opens out from where it sits to fill the screen, and its projects rise out as paper
     pages (styles: "Inside a folder" in site-showcase.css). A page opens that project's dialog. */
  var pt = document.createElement('dialog');
  pt.className = 'pt'; pt.setAttribute('aria-labelledby', 'pt-title');
  document.body.appendChild(pt);
  var ptFrom = null, ptAnims = [], ptClosing = null;
  var ptStop = function () { ptAnims.forEach(function (a) { a.cancel(); }); ptAnims = []; };
  var ROT = [-1.6, 1.1, -0.6, 1.5, -1.2, 0.7, -0.4, 1.3]; // a little crooked, like real paper
  var openFolder = function (f, direct) {
    if (ptClosing) { ptClosing.onfinish = null; ptClosing.cancel(); ptClosing = null; pt.classList.remove('is-closing'); }
    ptStop(); resetPage(ptFrom);
    if (pt.open) pt.close();
    ptFrom = direct ? null : f; // opened from a link elsewhere: no zoom out of the folder
    var label = f.querySelector('.pf-label');
    var files = [].filter.call(f.querySelectorAll('.pf-file'), function (a) { return PROJECTS[a.dataset.project]; });
    var extras = EXTRAS[f.dataset.extra] || [];
    var n = files.length + extras.length;
    pt.innerHTML =
      '<div class="pt-folder" tabindex="-1">' +
        '<div class="pt-tab"><span class="pt-label" id="pt-title">' + esc(label ? label.textContent : 'files') + '</span><span class="pt-count">' + n + (n === 1 ? ' file' : ' files') + '</span></div>' +
        '<button class="pt-x" type="button" aria-label="Close">✕</button>' +
        '<div class="pt-pages">' + files.map(function (a, i) {
          var p = PROJECTS[a.dataset.project], th = a.querySelector('.pf-thumb');
          return '<a class="pt-card" href="#projects" data-project="' + a.dataset.project + '" aria-haspopup="dialog" style="--rot:' + ROT[i % ROT.length] + '">' +
            '<span class="pt-thumb' + (p.tall ? ' is-tall' : '') + '">' + (th ? th.innerHTML : '') + '</span>' + // tall (phone) mockups show whole, not cropped
            '<strong>' + esc(p.title) + '</strong><span class="pt-sub">' + esc(p.date) + '</span><p>' + esc(p.desc) + '</p></a>';
        }).join('') + extras.map(function (x, i) {
          return '<a class="pt-card is-link" href="' + x.href + '" target="_blank" rel="noopener" style="--rot:' + ROT[(files.length + i) % ROT.length] + '">' +
            '<span class="pt-thumb is-play" aria-hidden="true">▶ ' + esc(x.title) + '</span>' +
            '<strong>' + esc(x.title) + '</strong><span class="pt-sub">' + esc(x.sub) + '</span><p>' + esc(x.desc) + '</p><span class="pt-go">' + esc(x.go) + '</span></a>';
        }).join('') + '</div>' +
      '</div>';
    pt.querySelector('.pt-x').addEventListener('click', function (e) { e.stopPropagation(); closeFolder(); });
    pt.querySelectorAll('.pt-card[data-project]').forEach(function (c) {
      c.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); openProject(c.dataset.project, c); });
    });
    var box = pt.querySelector('.pt-folder');
    var show = function () { pt.showModal(); box.focus({ preventScroll: true }); };
    if (reduce || !box.animate) return show();
    var go = function (el, k, o) { var a = el.animate(k, o); ptAnims.push(a); return a; };
    var rise = function (delay) { // the pages come up out of the folder, one after another
      [].forEach.call(box.querySelectorAll('.pt-card'), function (c, i) {
        var r = parseFloat(c.style.getPropertyValue('--rot')) || 0;
        go(c, [{ opacity: 0, transform: 'translateY(110px) rotate(' + (r * 5) + 'deg) scale(0.92)' }, { opacity: 1, transform: 'rotate(' + r + 'deg)' }],
           { duration: 650, delay: delay + Math.min(i, 9) * 65, easing: 'cubic-bezier(.2, .8, .2, 1)', fill: 'backwards' });
      });
    };
    if (direct) { // from a link elsewhere: the folder simply opens in the middle of the screen
      show();
      go(box, [{ opacity: 0, transform: 'scale(0.94)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2, .8, .2, 1)' });
      rise(180);
      return;
    }
    /* Going inside, in three beats:
       1. on the page, the folder's glass front falls open toward you and the files lift, while the
          folder moves closer (scales up a little);
       2. the inside of the folder opens out from exactly where the folder is until it fills the
          screen (a clip, so nothing stretches), easing in from slightly too close;
       3. the projects rise out of it as pages. */
    var move = f.querySelector('.pf-move'), front = f.querySelector('.pf-front'), backEl = f.querySelector('.pf-back');
    f.classList.add('is-open', 'is-entering');
    var t1 = 360;
    pageAnims = [
      front.animate([{ transform: 'perspective(700px) rotateX(0deg)' }, { transform: 'perspective(700px) rotateX(-62deg) translateY(8%)', opacity: 0.55 }],
        { duration: t1 + 120, easing: 'cubic-bezier(.5, 0, .3, 1)', fill: 'forwards' }),
      move.animate([{ scale: 1 }, { scale: 1.14 }], { duration: t1 + 300, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' })
    ];
    setTimeout(function () {
      if (!pt.isConnected || pt.open) return;
      show();
      var r = backEl.getBoundingClientRect(), d = pt.getBoundingClientRect();
      var clip = 'inset(' + Math.max(0, r.top - d.top) + 'px ' + Math.max(0, d.right - r.right) + 'px ' + Math.max(0, d.bottom - r.bottom) + 'px ' + Math.max(0, r.left - d.left) + 'px round 14px)';
      go(pt, [{ clipPath: clip }, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }], { duration: 640, easing: 'cubic-bezier(.65, 0, .25, 1)' });
      go(box, [{ transform: 'scale(1.18)', filter: 'brightness(1.08)' }, { transform: 'none', filter: 'none' }], { duration: 760, easing: 'cubic-bezier(.3, 0, .2, 1)' });
      try { go(pt, [{ opacity: 0 }, { opacity: 1 }], { duration: 420, pseudoElement: '::backdrop' }); } catch (e) {}
      rise(160);
    }, t1);
  };
  var pageAnims = [];
  var resetPage = function (f) { // put the folder on the page back as it was
    pageAnims.forEach(function (a) { a.cancel(); }); pageAnims = [];
    if (f) f.classList.remove('is-entering');
  };
  var closeFolder = function () {
    if (!pt.open || ptClosing) return;
    var f = ptFrom;
    var done = function () {
      pt.classList.remove('is-closing'); pt.close(); pt.innerHTML = ''; ptStop();
      if (f && !reduce && pageAnims.length) { // the folder's front swings back up and it settles back into place
        pageAnims.forEach(function (a) { a.reverse(); });
        var last = pageAnims[1]; last.onfinish = function () { resetPage(f); };
      } else resetPage(f);
      if (f) { var a = f.querySelector('.pf-file'); if (a) a.focus({ preventScroll: true }); }
    };
    var box = pt.querySelector('.pt-folder');
    if (reduce || !box || !box.animate) return done();
    ptStop();
    pt.classList.add('is-closing');
    [].forEach.call(box.querySelectorAll('.pt-card'), function (c) { ptAnims.push(c.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(80px)' }], { duration: 240, easing: 'ease-in', fill: 'forwards' })); });
    var back = f && f.querySelector('.pf-back'), a;
    if (back && back.getBoundingClientRect().width) {
      var r = back.getBoundingClientRect(), d = pt.getBoundingClientRect();
      var clip = 'inset(' + Math.max(0, r.top - d.top) + 'px ' + Math.max(0, d.right - r.right) + 'px ' + Math.max(0, d.bottom - r.bottom) + 'px ' + Math.max(0, r.left - d.left) + 'px round 14px)';
      a = pt.animate([{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', offset: 0.3 }, { clipPath: clip }], { duration: 620, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'forwards' });
      ptAnims.push(box.animate([{ transform: 'none' }, { transform: 'none', offset: 0.3 }, { transform: 'scale(1.12)' }], { duration: 620, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'forwards' }));
    } else {
      a = box.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(0.94)' }], { duration: 300, easing: 'ease-in', fill: 'forwards' });
    }
    ptClosing = a;
    a.onfinish = function () { if (ptClosing !== a) return; ptClosing = null; done(); a.cancel(); };
  };
  pt.addEventListener('cancel', function (e) { e.preventDefault(); closeFolder(); });

  /* Links straight into a folder (one click from anywhere): <a href="#folder-school"> or
     <a href="index.html#folder-school"> opens the folder whose data-folder="school" without
     scrolling to it; from another page, the same link opens it as the homepage loads. */
  var folderById = function (id) { return document.querySelector('.pf-folder[data-folder="' + id + '"]'); };
  var fromHash = /^#folder-([\w-]+)$/.exec(location.hash);
  if (fromHash && folderById(fromHash[1])) {
    window.addEventListener('load', function () { openFolder(folderById(fromHash[1]), true); });
  }
  // Links to index.html#folder-… clicked on this same page (e.g. in the footer) open the folder in place
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="#folder-"]');
    if (!a || a.target === '_blank' || a.pathname !== location.pathname) return;
    var m = /^#folder-([\w-]+)$/.exec(a.hash), f = m && folderById(m[1]);
    if (!f) return;
    e.preventDefault();
    openFolder(f, true);
  });
  pt.addEventListener('click', function (e) {
    if (ptClosing) { var a = ptClosing; ptClosing = null; a.onfinish = null; a.cancel(); ptStop(); pt.classList.remove('is-closing'); pt.close(); pt.innerHTML = ''; resetPage(ptFrom); return; }
    if (e.target === pt) closeFolder(); // tap outside the folder
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
