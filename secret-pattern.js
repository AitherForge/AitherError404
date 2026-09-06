/* AitherError404 — hidden iPhone-style keypad */
(() => {
  'use strict';

  const SECRET_CODES = new Set(['0711', '0503']);
  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  const TARGET = 'aither-secret-keypad';

  // Large, easy-to-hit phone keypad. It stays invisible but remains touchable.
  const KEY_SIZE = 92;
  const GAP = 6;

  let input = '';
  let lastKey = '';
  let completed = false;

  const keypad = document.createElement('div');
  keypad.id = TARGET;
  keypad.setAttribute('aria-hidden', 'true');
  keypad.setAttribute('role', 'group');
  Object.assign(keypad.style, {
    position: 'fixed',
    right: 'max(12px, env(safe-area-inset-right))',
    bottom: 'max(12px, env(safe-area-inset-bottom))',
    width: `${KEY_SIZE * 3 + GAP * 2}px`,
    height: `${KEY_SIZE * 4 + GAP * 3}px`,
    zIndex: '99999',
    opacity: '0',
    pointerEvents: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gap: `${GAP}px`,
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none'
  });

  for (const key of KEYS) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.key = key;
    button.tabIndex = -1;
    button.setAttribute('aria-label', `Secret keypad ${key}`);
    Object.assign(button.style, {
      appearance: 'none',
      WebkitAppearance: 'none',
      border: '0',
      borderRadius: '50%',
      background: 'transparent',
      color: 'transparent',
      width: '100%',
      height: '100%',
      minWidth: `${KEY_SIZE}px`,
      minHeight: `${KEY_SIZE}px`,
      padding: '0',
      margin: '0',
      outline: 'none',
      opacity: '0',
      pointerEvents: 'auto',
      touchAction: 'none',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'default'
    });

    button.addEventListener('pointerdown', event => {
      event.preventDefault();
      event.stopPropagation();
      if (completed) return;

      if (lastKey === key && event.pointerType !== 'touch') return;
      lastKey = key;

      if (!/^\d$/.test(key)) {
        input = '';
        return;
      }

      input += key;
      if (input.length > 4) input = input.slice(-4);

      if (SECRET_CODES.has(input)) {
        completed = true;
        const code = input;
        input = '';
        window.dispatchEvent(new CustomEvent('aither:secret-pattern', {
          detail: { code }
        }));
        return;
      }

      if (![...SECRET_CODES].some(code => code.startsWith(input))) {
        input = '';
      }
    }, { passive: false });

    button.addEventListener('pointerup', () => {
      lastKey = '';
    }, { passive: true });

    button.addEventListener('pointercancel', () => {
      lastKey = '';
      input = '';
    }, { passive: true });

    keypad.appendChild(button);
  }

  document.body.appendChild(keypad);
})();
