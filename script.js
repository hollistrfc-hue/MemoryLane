/* ============================================================
   Memory Lane Vintage Mall — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ----- Mobile Nav Toggle -----
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Active Nav Link -----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ----- Netlify Form Success Handling -----
  // Show a friendly message if redirected back after submission
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    const successMsgs = document.querySelectorAll('.form-success');
    successMsgs.forEach(function (el) {
      el.style.display = 'block';
    });
    const forms = document.querySelectorAll('form[netlify]');
    forms.forEach(function (form) {
      form.style.display = 'none';
    });
  }

});
