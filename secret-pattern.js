/* AitherError404 — secret touch code controller */
(() => {
  'use strict';

  // The hidden touch sequence is now: 0711, then 0503.
  const SECRET_CODES = ['0711', '0503'];
  const GRID = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', '', '']
  ];
  const TARGET = 'aither-secret-pattern';

  let input = '';
  let completed = false;
  let tracking = false;

  const overlay = document.createElement('div');
  overlay.id = TARGET;
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {
    position: 'fixed',
    right: '14px',
    bottom: 'max(42px, env(safe-area-inset-bottom))',
    width: '132px',
    height: '176px',
    zIndex: '9999',
    opacity: '0',
    pointerEvents: 'auto',
    touchAction: 'none'
  });

  const grid = document.createElement('div');
  Object.assign(grid.style, {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gap: '0'
  });

  GRID.flat().forEach(number => {
    const point = document.createElement('button');
    point.type = 'button';
    point.dataset.number = number;
    point.tabIndex = -1;
    point.setAttribute('aria-label', number ? `Secret point ${number}` : 'Unused secret point');
    Object.assign(point.style, {
      appearance: 'none',
      border: '0',
      background: 'transparent',
      width: '100%',
      height: '100%',
      padding: '0',
      margin: '0',
      cursor: 'default',
      touchAction: 'none'
    });
    grid.appendChild(point);
  });

  overlay.appendChild(grid);
  document.body.appendChild(overlay);

  function reset() {
    input = '';
    tracking = false;
  }

  function register(number) {
    if (completed || !tracking || !number) return;
    if (input.length >= 8) return;

    input += number;

    const validPrefix = SECRET_CODES.some(code => code.startsWith(input) || input === code);
    const fullCode = SECRET_CODES.join('');

    if (!validPrefix && !fullCode.startsWith(input)) {
      reset();
      return;
    }

    if (input === fullCode) {
      completed = true;
      window.dispatchEvent(new CustomEvent('aither:secret-pattern', {
        detail: { codes: SECRET_CODES.slice() }
      }));
      reset();
    }
  }

  function numberFromEvent(event) {
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const point = target && target.closest && target.closest('[data-number]');
    return point && point.dataset.number ? point.dataset.number : null;
  }

  overlay.addEventListener('pointerdown', event => {
    tracking = true;
    input = '';
    const number = numberFromEvent(event);
    if (number) register(number);
  });

  overlay.addEventListener('pointermove', event => {
    if (!tracking) return;
    const number = numberFromEvent(event);
    if (number) register(number);
  });

  window.addEventListener('pointerup', reset, { passive: true });
  window.addEventListener('pointercancel', reset, { passive: true });
})();
