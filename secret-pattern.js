/* AitherError404 — secret touch pattern controller */
(() => {
  'use strict';

  const SECRET_PATTERN = [1, 5, 9, 8, 7, 4, 2];
  const GRID_SIZE = 3;
  const MAX_POINTS = 12;
  const TARGET = 'aither-secret-pattern';

  let points = [];
  let tracking = false;
  let completed = false;

  const overlay = document.createElement('div');
  overlay.id = TARGET;
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    right: '14px',
    bottom: 'max(42px, env(safe-area-inset-bottom))',
    width: '132px',
    height: '132px',
    zIndex: '9999',
    opacity: '0',
    pointerEvents: 'none'
  });

  const grid = document.createElement('div');
  Object.assign(grid.style, {
    width: '100%', height: '100%', display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)'
  });

  for (let i = 1; i <= GRID_SIZE * GRID_SIZE; i++) {
    const point = document.createElement('button');
    point.type = 'button';
    point.dataset.point = String(i);
    point.tabIndex = -1;
    point.setAttribute('aria-label', `Secret point ${i}`);
    Object.assign(point.style, {
      appearance: 'none', border: '0', background: 'transparent',
      width: '100%', height: '100%', padding: '0', margin: '0',
      cursor: 'default', touchAction: 'none'
    });
    grid.appendChild(point);
  }

  overlay.appendChild(grid);
  document.body.appendChild(overlay);

  function reset() {
    points = [];
    tracking = false;
  }

  function registerPoint(number) {
    if (completed || !tracking || points.length >= MAX_POINTS) return;
    if (points[points.length - 1] === number) return;
    if (points.includes(number)) {
      reset();
      return;
    }
    points.push(number);

    if (points.length === SECRET_PATTERN.length) {
      if (points.every((value, index) => value === SECRET_PATTERN[index])) {
        completed = true;
        window.dispatchEvent(new CustomEvent('aither:secret-pattern', {
          detail: { pattern: SECRET_PATTERN.slice() }
        }));
        reset();
      } else {
        reset();
      }
    }
  }

  function pointFromEvent(event) {
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const point = target && target.closest && target.closest('[data-point]');
    return point ? Number(point.dataset.point) : null;
  }

  overlay.addEventListener('pointerdown', event => {
    tracking = true;
    points = [];
    const number = pointFromEvent(event);
    if (number) registerPoint(number);
  });

  overlay.addEventListener('pointermove', event => {
    if (!tracking) return;
    const number = pointFromEvent(event);
    if (number) registerPoint(number);
  });

  window.addEventListener('pointerup', reset, { passive: true });
  window.addEventListener('pointercancel', reset, { passive: true });
})();
