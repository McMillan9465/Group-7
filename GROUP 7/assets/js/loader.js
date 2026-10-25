/* ============================================================
   Starlight Primary School — page loading effect
   Included on every page, immediately after <body> opens.
   Shows a branded overlay until the page has fully loaded.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var overlay = document.createElement('div');
  overlay.className = 'page-loader';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="loader-inner">' +
      '<svg class="loader-star" viewBox="0 0 64 64" width="58" height="58" aria-hidden="true">' +
        '<rect x="2" y="2" width="60" height="60" rx="16" fill="#1E2A4E"></rect>' +
        '<path d="M32 14 L36.5 25.9 L49.1 26.4 L39.2 34.3 L42.6 46.6 L32 39.6 ' +
                'L21.4 46.6 L24.8 34.3 L14.9 26.4 L27.5 25.9 Z" fill="#E9A63B"></path>' +
      '</svg>' +
      '<p class="loader-word">Starlight Primary School</p>' +
      '<span class="loader-bar" aria-hidden="true"><i></i></span>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.classList.add('is-loading');

  var started = Date.now();
  var minDelay = reduceMotion ? 0 : 550;
  var hidden = false;

  function hide() {
    if (hidden) return;
    hidden = true;
    var wait = Math.max(0, minDelay - (Date.now() - started));
    window.setTimeout(function () {
      overlay.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
      window.setTimeout(function () {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 500);
    }, wait);
  }

  window.addEventListener('load', hide);
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) hide(); // back/forward cache
  });
  window.setTimeout(hide, 4000); // safety net
})();
