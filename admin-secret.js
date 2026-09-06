/* AitherError404 — secret pattern response */
(() => {
  'use strict';

  // A successful hidden keypad code immediately opens the Aither admin dashboard.
  // The dashboard handles the actual account/session login.
  const ADMIN_LOGIN_URL = 'https://ogaithertech.github.io/AitherDashboard/';

  window.addEventListener('aither:secret-pattern', () => {
    // Replace the 404 page in the current history entry so Back does not
    // immediately return to the hidden-keypad page.
    window.location.replace(ADMIN_LOGIN_URL);
  }, { once: true });
})();
