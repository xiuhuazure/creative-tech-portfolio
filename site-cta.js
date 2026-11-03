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
  // 1. Get a free access key at https://web3forms.com (enter the email you want messages sent to).
  // 2. Paste it here. Messages then arrive in that inbox and your address never appears on the site.
  var FORM_KEY = '';
  var form = sec.querySelector('.cta2-form');
  if (form) {
    var status = form.querySelector('.cta2-status'), btn = form.querySelector('.cta2-btn');
    var say = function (msg, ok) { if (status) { status.textContent = msg; status.className = 'cta2-status' + (ok ? ' is-ok' : ok === false ? ' is-err' : ''); } };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var f = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var name = f('name'), email = f('email'), note = f('message');
      var subject = 'Work opportunity' + (name ? ' from ' + name : '');
      if (!FORM_KEY) {
        // Until the key is added: open the visitor's email app (address assembled here so it isn't in the page text)
        var to = ['kimberlydacucoyu', 'gmail.com'].join('@');
        window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(note + '\n\n— ' + name + ' (' + email + ')');
        return;
      }
      btn.disabled = true; say('Sending…');
      fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: FORM_KEY, subject: subject, from_name: name, name: name, email: email, message: note, botcheck: '' })
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res && res.success) { form.reset(); say('Thanks! Your message is on its way. I’ll get back to you soon.', true); }
        else throw new Error('send failed');
      }).catch(function () {
        say('Sorry, that didn’t send. Please try again, or message me on LinkedIn.', false);
      }).then(function () { btn.disabled = false; });
    });
  }
})();
