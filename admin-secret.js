/* AitherError404 — secret pattern response */
(() => {
  'use strict';

  window.addEventListener('aither:secret-pattern', () => {
    // The admin login lives on this AitherError404 site.
    // Unlock only this browser tab, then navigate immediately.
    try {
      sessionStorage.setItem('aither_admin_unlocked', '1');
    } catch (_) {
      // Navigation still works if storage is unavailable.
    }

    window.location.replace('./admin/');
  }, { once: true });
})();
