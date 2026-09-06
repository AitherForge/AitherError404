/* AitherError404 — secret pattern response */
(() => {
  'use strict';

  window.addEventListener('aither:secret-pattern', () => {
    const toast = document.createElement('div');
    toast.textContent = 'Aither Admin';
    toast.setAttribute('role', 'status');
    Object.assign(toast.style, {
      position: 'fixed',
      left: '50%',
      bottom: '32px',
      transform: 'translate(-50%, 14px)',
      zIndex: '10000',
      padding: '12px 18px',
      borderRadius: '14px',
      background: '#111',
      color: '#fff',
      font: '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      boxShadow: '0 10px 30px rgba(0,0,0,.18)',
      opacity: '0',
      transition: 'opacity .2s ease, transform .2s ease',
      pointerEvents: 'none'
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translate(-50%, 0)';
    });

    window.setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 14px)';
      window.setTimeout(() => toast.remove(), 220);
    }, 1400);
  });
})();
