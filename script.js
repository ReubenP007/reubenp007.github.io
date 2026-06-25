/* Progressive enhancement only — the page is fully readable without JS.
   - Assembles the contact email at runtime so the plaintext address isn't
     sitting in the static HTML for scrapers (a <noscript> fallback is shown).
   - Wires the "Save as PDF" buttons to the browser print dialog.
   - Stamps the current year in the footer. */
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
})();
