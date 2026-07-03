/* Progressive enhancement only. The page is fully readable without JS.
   - Assembles the contact email at runtime so the plaintext address isn't
     sitting in the static HTML for scrapers (a <noscript> fallback is shown).
   - Wires the "Save as PDF" buttons to the browser print dialog.
   - Stamps the current year in the footer.
   - Reveal-on-scroll for [data-reveal] sections (skipped without
     IntersectionObserver or with reduced-motion preference). */
(function () {
  'use strict';

  var email = document.getElementById('email-link');
  if (email) {
    var user = email.getAttribute('data-user');
    var domain = email.getAttribute('data-domain');
    if (user && domain) {
      var addr = user + '@' + domain;
      email.setAttribute('href', 'mailto:' + addr);
      email.removeAttribute('aria-disabled');
      var label = email.querySelector('.contact-text');
      if (label) { label.textContent = addr; }
    }
  }

  var printers = document.querySelectorAll('[data-print]');
  Array.prototype.forEach.call(printers, function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });

  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  // Reveal-on-scroll. The .js class gates the hidden initial state so the
  // page never renders invisible content when this script doesn't run.
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(document.querySelectorAll('[data-reveal]'), function (el) {
      io.observe(el);
    });
  }
})();
