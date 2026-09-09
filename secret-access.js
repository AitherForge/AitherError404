/* AitherError404 — Firebase-backed Aither Admin access */
(() => {
  'use strict';
  window.addEventListener('aither:secret-pattern', () => {
    try { sessionStorage.setItem('aither_console_unlocked', '1'); } catch (_) {}
    window.location.assign('/AitherError404/console/firebase-login.html');
  }, { once: true });
})();
