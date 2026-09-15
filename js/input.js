// Teclado e botões de toque
function bindInput(g) {
  const keys = new Set();
  const apply = () => { g.player.dir = (keys.has('ArrowRight') || keys.has('KeyD') ? 1 : 0) - (keys.has('ArrowLeft') || keys.has('KeyA') ? 1 : 0); };

  window.addEventListener('keydown', e => {
    if (['ArrowLeft', 'ArrowRight', 'Space', 'KeyA', 'KeyD'].includes(e.code)) e.preventDefault();
    if (e.code === 'KeyP' || e.code === 'Escape') { if (!e.repeat) g.togglePause(); return; }
    if (g.state !== 'playing') { if (!e.repeat) g.onAny(); return; }
    if (e.code === 'Space') { g.firing = true; return; }
    keys.add(e.code); apply();
  });
  window.addEventListener('keyup', e => { if (e.code === 'Space') g.firing = false; keys.delete(e.code); apply(); });
  window.addEventListener('blur', () => { keys.clear(); apply(); g.firing = false; });

  document.querySelectorAll('#touch button').forEach(b => {
    const a = b.dataset.action;
    const down = e => { e.preventDefault(); if (g.state !== 'playing') return g.onAny(); if (a === 'fire') g.firing = true; else g.player.dir = a === 'left' ? -1 : 1; };
    const up = () => { if (a === 'fire') g.firing = false; else g.player.dir = 0; };
    b.addEventListener('pointerdown', down);
    b.addEventListener('pointerup', up); b.addEventListener('pointerleave', up); b.addEventListener('pointercancel', up);
  });

  // arrastar no canvas move a nave; toque rápido atira
  const canvas = document.getElementById('game');
  canvas.addEventListener('pointerdown', e => { if (g.state !== 'playing') return g.onAny(); g.firing = true; setTimeout(() => { g.firing = false; }, 80); });
  canvas.addEventListener('pointermove', e => {
    if (g.state !== 'playing' || e.pointerType === 'mouse') return;
    const r = canvas.getBoundingClientRect();
    g.player.x = (e.clientX - r.left) * (W / r.width) - g.player.w / 2;
  });
  document.getElementById('overlay').addEventListener('pointerdown', e => { e.preventDefault(); g.onAny(); });
}
