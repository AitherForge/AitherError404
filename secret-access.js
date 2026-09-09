/* AitherError404 — shared Aither Admin access through AitherBackendNew. */
(() => {
  'use strict';
  const API = 'https://aitherbackendnew.onrender.com';
  window.AitherAdmin = {
    backend: API,
    async health() {
      const r = await fetch(API + '/api/health', {cache:'no-store'});
      return r.ok;
    }
  };
  window.addEventListener('aither:secret-pattern', () => {
    try { sessionStorage.setItem('aither_console_unlocked', '1'); } catch (_) {}
    window.location.assign('./console/firebase-login.html');
  }, { once: true });
})();
