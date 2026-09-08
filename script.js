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

  // ----- Vendor Application Form — Modal Submission -----
  const vendorForm = document.getElementById('vendor-form');
  const vendorModal = document.getElementById('vendor-modal');
  const modalClose = document.getElementById('modal-close');

  if (vendorForm && vendorModal) {
    vendorForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(vendorForm);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function () {
        vendorModal.hidden = false;
        vendorModal.focus();
      })
      .catch(function () {
        vendorModal.hidden = false;
      });
    });

    function closeModal() {
      vendorModal.hidden = true;
      vendorForm.reset();
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);

    vendorModal.addEventListener('click', function (e) {
      if (e.target === vendorModal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !vendorModal.hidden) closeModal();
    });
  }

});
