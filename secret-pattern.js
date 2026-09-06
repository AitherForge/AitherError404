/* AitherError404 — iPhone-style hidden keypad */
(() => {
  'use strict';

  // Either code unlocks the hidden admin UI.
  const SECRET_CODES = ['0711', '0503'];
  const TARGET = 'aither-secret-keypad';
  const KEY_SIZE = 78;

  let input = '';
  let completed = false;

  const keypad = document.createElement('div');
  keypad.id = TARGET;
  keypad.setAttribute('aria-hidden', 'true');
  keypad.setAttribute('role', 'group');
  keypad.setAttribute('aria-label', 'Secret keypad');
  Object.assign(keypad.style, {
    position: 'fixed',
    right: 'max(12px, env(safe-area-inset-right))',
    bottom: 'max(12px, env(safe-area-inset-bottom))',
    width: `${KEY_SIZE * 3}px`,
    height: `${KEY_SIZE * 4}px`,
    zIndex: '9999',
    opacity: '0',
    pointerEvents: 'auto',
    touchAction: 'manipulation',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gap: '0',
    background: 'transparent'
  });

  // iPhone Phone keypad layout:
  // 1 2 3
  // 4 5 6
  // 7 8 9
  // * 0 #
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  for (const key of keys) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = key;
    button.dataset.key = key;
    button.tabIndex = -1;
    button.setAttribute('aria-label', `Secret keypad ${key}`);
    Object.assign(button.style, {
      appearance: 'none',
      border: '0',
      background: 'transparent',
      color: 'transparent',
      width: '100%',
      height: '100%',
      padding: '0',
      margin: '0',
      outline: 'none',
      fontSize: '1px',
      cursor: 'default',
      touchAction: 'manipulation'
    });

    button.addEventListener('pointerdown', event => {
      event.preventDefault();
      if (completed) return;

      if (!/^\d$/.test(key)) {
        input = '';
        return;
      }

      input += key;
      if (input.length > 4) input = input.slice(-4);

      if (SECRET_CODES.includes(input)) {
        completed = true;
        window.dispatchEvent(new CustomEvent('aither:secret-pattern', {
          detail: { code: input }
        }));
        input = '';
      }
    });

    keypad.appendChild(button);
  }

  document.body.appendChild(keypad);
})();
