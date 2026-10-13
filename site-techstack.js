/* =========================================================================
   Tech stack rail — fills the track to exactly 4 copies of the logo set
   (so translateX(-25%) loops seamlessly) and fades the header in on scroll.
   Styles in site-techstack.css.
   ========================================================================= */
(function () {
  var sec = document.getElementById('stack');
  if (!sec) return;

  var track = sec.querySelector('.ts-track');
  if (track) {
    var items = Array.prototype.slice.call(track.children);
    for (var k = 1; k < 4; k++) {
      items.forEach(function (li) {
        var copy = li.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');          // screen readers hear the list once
        var svg = copy.querySelector('svg');
        svg.removeAttribute('role'); svg.removeAttribute('aria-label');
        track.appendChild(copy);
      });
    }
    sec.classList.add('ready');                             // start the rail only once it's full
  }

  var head = sec.querySelector('.ts-head');
  if (head && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { sec.classList.add('in'); io.disconnect(); } });
    }, { threshold: 0.15 });
    io.observe(head);
  } else {
    sec.classList.add('in');
  }
})();
