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

  /* Details shown in the pop-up, newest first (keep the same order as the holders in about.html).
 */
  var credly = function (id) { return ['Verify on Credly ↗', 'https://www.credly.com/badges/' + id + '/public_url']; };
  var cisco = function (title, when, tech, desc, img, id) {
    return {
      title: title, date: 'Cisco Networking Academy · ' + when, tech: tech.concat(['Credly badge']),
      desc: desc + ' Verified with a Credly badge.',
      media: { img: img, alt: 'Cisco Networking Academy ' + title + ' certificate for Kimberly D. Yu', contain: true },
      links: [credly(id)]
    };
  };
  var CERTS = {
    'ibm-itf': {
      title: 'Information Technology Fundamentals', date: 'IBM SkillsBuild · Oct 31, 2026',
      tech: ['IT fundamentals', 'Hardware & software', 'Networking', 'Credly badge'],
      desc: 'An IBM SkillsBuild course on the foundations of information technology: hardware, software, networking and security basics. Verified with a Credly badge.',
      media: { img: 'media/certs/ibm-it-fundamentals.jpg', alt: 'IBM SkillsBuild Information Technology Fundamentals certificate for Kimberly D. Yu', contain: true },
      links: [credly('5d70aee7-7b52-41b3-a010-70b1a3233019')]
    },
    'cisco-eh': cisco('Ethical Hacker', 'Mar 16, 2026', ['Ethical hacking', 'Penetration testing'],
      'Cisco Networking Academy’s Ethical Hacker course: planning and running penetration tests, finding and exploiting vulnerabilities, and reporting what you find.',
      'media/certs/cisco-ethical-hacker.jpg', 'd03be857-67bd-4bcf-8a60-c1e86cf9d7b8'),
    'thm-presec': {
      title: 'Pre Security Learning Path', date: 'TryHackMe · Feb 22, 2026',
      tech: ['Networking', 'How the web works', 'Linux', 'Windows'],
      desc: 'TryHackMe’s Pre Security learning path (19 hours 10 minutes): the groundwork for cyber security, from networking and how the web works to Linux and Windows basics. Credential ID THM-6OBCH9ERDF.',
      media: { img: 'media/certs/thm-pre-security.jpg', alt: 'TryHackMe Pre Security learning path certificate for Kimberly D. Yu', contain: true },
      links: [['View certificate ↗', 'https://tryhackme.com/certificate/THM-6OBCH9ERDF']]
    },
    'thm-aoc25': {
      title: 'Advent of Cyber 2025', date: 'TryHackMe · Dec 28, 2025',
      tech: ['Cyber security', '24 challenges'],
      desc: 'Completed all 24 cyber security challenges in TryHackMe’s Advent of Cyber 2025, showing an understanding of cyber security fundamentals. Credential ID THM-WLI1VROODS.',
      media: { img: 'media/certs/thm-advent-of-cyber-2025.jpg', alt: 'TryHackMe Advent of Cyber 2025 certificate for Kimberly D. Yu', contain: true },
      links: [['View certificate ↗', 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-WLI1VROODS.pdf']]
    },
    'cisco-ds': cisco('Introduction to Data Science', 'Dec 27, 2025', ['Data science', 'Data analysis'],
      'Cisco Networking Academy’s introduction to data science: how data is collected, analysed and used to make decisions.',
      'media/certs/cisco-intro-data-science.jpg', '2068e9f7-bd38-4be8-b898-90f148040809'),
    'cisco-ics': cisco('Introduction to Cybersecurity', 'Dec 15, 2025', ['Cybersecurity', 'Online safety'],
      'Cisco Networking Academy’s introduction to cybersecurity: common threats and attacks, how to protect yourself and organisations online, and careers in the field.',
      'media/certs/cisco-intro-cybersecurity.jpg', '301d9f3b-a84b-4a72-b63c-51c9bd489dd8')
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
