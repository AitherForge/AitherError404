/* AitherError404 — secret pattern response */
(() => {
  'use strict';

  window.addEventListener('aither:secret-pattern', () => {
    try {
      sessionStorage.setItem('aither_admin_unlocked', '1');
    } catch (_) {}

    // Always open the admin login on this AitherError404 GitHub Pages site,
    // even when GitHub serves the custom 404 from a nested URL.
    window.location.assign('/AitherError404/admin/');
  }, { once: true });
})();
