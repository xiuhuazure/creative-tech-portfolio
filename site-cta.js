/* =========================================================================
   Homepage CTA — staggered fade-up on scroll, and the contact form.
   The form sends through Web3Forms (free; the access key is safe to keep in
   the page, it only lets people send you messages). Your email address is
   never shown on the site. Styles: site-cta.css
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

  // ---- Contact form ----
  // Messages go to Formspree, which emails them straight to Kimberly's inbox (her address never
  // appears on the site). Change the form at formspree.io; this endpoint is meant to be public.
  var FORM_URL = 'https://formspree.io/f/mljbwbww';
  var form = sec.querySelector('.cta2-form');
  if (form) {
    // the message box grows with the text (for browsers without CSS field-sizing)
    var ta = form.querySelector('textarea');
    if (ta && !(window.CSS && CSS.supports('field-sizing', 'content'))) {
      var fit = function () { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
      ta.addEventListener('input', fit); form.addEventListener('reset', function () { setTimeout(fit, 0); });
    }
    var status = form.querySelector('.cta2-status'), btn = form.querySelector('.cta2-btn');
    var say = function (msg, ok) { if (status) { status.textContent = msg; status.className = 'cta2-status' + (ok ? ' is-ok' : ok === false ? ' is-err' : ''); } };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var f = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var name = f('name'), email = f('email'), note = f('message');
      btn.disabled = true; var label = btn.textContent; btn.textContent = 'Sending…'; say('');
      fetch(FORM_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // "email" becomes the reply-to, so answering the notification replies to the sender; _gotcha catches bots
        body: JSON.stringify({ name: name, email: email, message: note, _subject: 'Work opportunity' + (name ? ' from ' + name : ''), _gotcha: f('_gotcha') })
      }).then(function (r) {
        if (!r.ok) throw new Error('send failed');
        form.reset(); say('Thanks! Your message is on its way. I’ll get back to you soon.', true);
      }).catch(function () {
        say('Sorry, that didn’t send. Please try again, or message me on LinkedIn.', false);
      }).then(function () { btn.disabled = false; btn.textContent = label; });
    });
  }
})();
