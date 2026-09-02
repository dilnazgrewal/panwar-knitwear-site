/* Panwar Knitwear — homepage behaviour */
(function () {
  'use strict';

  var WA = '919815703769';

  /* ---------- Year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  var head = document.getElementById('siteHead');
  if (head) {
    var onScroll = function () {
      head.classList.toggle('is-stuck', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });

    // Reset when we cross back to desktop so the panel can't stay stuck open.
    var mq = window.matchMedia('(min-width: 901px)');
    var onMQ = function (e) { if (e.matches) setNav(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMQ);
    else if (mq.addListener) mq.addListener(onMQ);
  }

  /* ---------- Scroll reveal ----------
     The hero animates from CSS on load, so it is excluded here. */
  var reveals = document.querySelectorAll('[data-reveal]:not(.hero [data-reveal])');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var showAll = function () {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('in'); });
  };

  if (!('IntersectionObserver' in window) || reduced) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });

    // Safety net: content must never be left invisible because the observer
    // did not run. If nothing has been revealed shortly after load, drop the
    // effect and show everything.
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (!document.querySelector('[data-reveal].in')) showAll();
      }, 600);
    });
  }

  /* ---------- Enquiry form → WhatsApp ---------- */
  var form = document.getElementById('enqForm');
  var err = document.getElementById('formErr');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      var nameInput = form.elements.name;

      if (!name) {
        if (err) err.hidden = false;
        nameInput.setAttribute('aria-invalid', 'true');
        nameInput.focus();
        return;
      }

      if (err) err.hidden = true;
      nameInput.removeAttribute('aria-invalid');

      var company = form.elements.company.value.trim();
      var product = form.elements.product.value;
      var qty = form.elements.qty.value.trim();
      var msg = form.elements.message.value.trim();

      var lines = ['Hello Panwar Knitwear,', ''];
      lines.push('Name: ' + name);
      if (company) lines.push('Company: ' + company);
      lines.push('Product: ' + product);
      if (qty) lines.push('Quantity: ' + qty);
      if (msg) lines.push('', msg);

      window.open(
        'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')),
        '_blank',
        'noopener'
      );
    });

    form.addEventListener('input', function (e) {
      if (e.target === form.elements.name && e.target.value.trim()) {
        if (err) err.hidden = true;
        e.target.removeAttribute('aria-invalid');
      }
    });
  }
})();
