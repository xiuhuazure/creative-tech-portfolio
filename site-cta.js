/* =========================================================================
   Homepage CTA — staggered fade-up on scroll, and the "Email me" form, which
   opens the visitor's email app with the subject and their note filled in
   (the site is static, so there's no server to post to). Styles: site-cta.css
   ========================================================================= */
(function () {
  var sec = document.querySelector('.cta2');
  if (!sec) return;

  // Fade-up when the card scrolls into view
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { sec.classList.add('in'); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(sec.querySelector('.cta2-card'));
  } else {
    sec.classList.add('in');
  }

  // Respect reduced motion for the SVG sparkles too
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var svg = sec.querySelector('.cta2-icon svg');
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
  }

  // Form -> pre-filled email
  var form = sec.querySelector('.cta2-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // The site has no server, so the message opens in the visitor's email app, ready to send
      var f = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var name = f('name'), email = f('email'), note = f('message');
      var body = note + '\n\n— ' + name + (email ? ' (' + email + ')' : '');
      var url = 'mailto:' + form.getAttribute('data-email') +
        '?subject=' + encodeURIComponent('Work opportunity' + (name ? ' from ' + name : '')) +
        '&body=' + encodeURIComponent(body);
      window.location.href = url;
    });
  }
})();
