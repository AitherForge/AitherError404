/* AitherError404 — hidden admin gesture */
(() => {
  'use strict';

  const TARGET = 'aither-secret-gesture';
  const CORNER_SIZE = 150;
  const HOLD_MS = 1800;
  const corners = new Set();
  let holdTimer = null;
  let completed = false;

  const gesture = document.createElement('div');
  gesture.id = TARGET;
  gesture.setAttribute('aria-hidden', 'true');
  Object.assign(gesture.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    pointerEvents: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none'
  });

  const positions = [
    ['top-left', 0, 0],
    ['top-right', null, 0],
    ['bottom-left', 0, null],
    ['bottom-right', null, null]
  ];

  function addCorner(name, left, top) {
    const zone = document.createElement('div');
    zone.dataset.corner = name;
    Object.assign(zone.style, {
      position: 'absolute',
      width: `${CORNER_SIZE}px`,
      height: `${CORNER_SIZE}px`,
      left: left === null ? 'auto' : '0',
      right: left === null ? '0' : 'auto',
      top: top === null ? 'auto' : '0',
      bottom: top === null ? '0' : 'auto',
      pointerEvents: 'auto',
      background: 'transparent',
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent'
    });

    const tap = event => {
      event.preventDefault();
      event.stopPropagation();
      corners.add(name);
      if (corners.size === 4) {
        // The four corners must be tapped before the logo can complete the gesture.
        document.documentElement.dataset.aitherCornersReady = '1';
      }
    };

    zone.addEventListener('pointerup', tap, { passive: false });
    zone.addEventListener('click', tap, { passive: false });
    zone.addEventListener('pointercancel', () => corners.delete(name));
    gesture.appendChild(zone);
  }

  positions.forEach(([name, left, top]) => addCorner(name, left, top));

  // The logo is the visible Aither mark on the 404 page.
  function findLogo() {
    return document.querySelector('.mark');
  }

  function startHold(event) {
    const logo = findLogo();
    if (!logo || completed || corners.size !== 4) return;
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(holdTimer);
    logo.dataset.aitherHolding = '1';
    holdTimer = setTimeout(() => {
      completed = true;
      try { sessionStorage.setItem('aither_admin_unlocked', '1'); } catch (_) {}
      window.dispatchEvent(new CustomEvent('aither:secret-pattern', {
        detail: { method: 'corners-and-logo-hold' }
      }));
    }, HOLD_MS);
  }

  function endHold(event) {
    const logo = findLogo();
    if (logo) delete logo.dataset.aitherHolding;
    clearTimeout(holdTimer);
    holdTimer = null;
  }

  function attachLogo() {
    const logo = findLogo();
    if (!logo || logo.dataset.aitherSecretAttached) return !!logo;
    logo.dataset.aitherSecretAttached = '1';
    Object.assign(logo.style, {
      position: 'relative',
      cursor: 'default',
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    });
    logo.addEventListener('pointerdown', startHold, { passive: false });
    logo.addEventListener('pointerup', endHold, { passive: true });
    logo.addEventListener('pointercancel', endHold, { passive: true });
    logo.addEventListener('pointerleave', endHold, { passive: true });
    logo.addEventListener('contextmenu', event => event.preventDefault());
    return true;
  }

  document.body.appendChild(gesture);
  if (!attachLogo()) {
    window.addEventListener('load', attachLogo, { once: true });
  }
})();
