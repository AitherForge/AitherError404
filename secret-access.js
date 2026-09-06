/* AitherError404 — secret pattern response */
(() => {
  'use strict';

  window.addEventListener('aither:secret-pattern', () => {
    try {
      sessionStorage.setItem('aither_console_unlocked', '1');
    } catch (_) {}

    // Always open the private sign-in page on this AitherError404 GitHub Pages site,
    // even when GitHub serves the custom 404 from a nested URL.
    window.location.assign('/AitherError404/console/');
  }, { once: true });
})();
