// Formação de invasores: marcha lateral, descida, aceleração e bombas
class Invaders {
  constructor(wave) {
    this.list = [];
    for (let r = 0; r < INV_ROWS; r++) {
      for (let c = 0; c < INV_COLS; c++) {
        this.list.push({
          x: 40 + c * (INV_W + INV_GAP_X),
          y: INV_TOP + Math.min(wave - 1, 4) * 12 + r * (INV_H + INV_GAP_Y),
          w: INV_W, h: INV_H, row: r, col: c,
          type: ROW_TYPE[r], points: ROW_POINTS[r], alive: true,
        });
      }
    }
    this.total = this.list.length;
    this.dir = 1;
    this.timer = 0;
    this.frame = 0;
    this.wave = wave;
    this.bombTimer = 0;
  }

  get alive() { return this.list.filter(i => i.alive); }
  get count() { return this.alive.length; }

  // Intervalo entre passos: menor quanto menos invasores restam e maior a onda
  interval() {
    const ratio = this.count / this.total;
    const base = INV_BASE_INTERVAL - (this.wave - 1) * 70;
    return Math.max(INV_MIN_INTERVAL, base * (0.15 + 0.85 * ratio));
  }

  // Retorna 'step' quando a formação anda (para o som), 'landed' se chegou no chão
  update(dt) {
    this.timer += dt * 1000;
    let ev = null;
    if (this.timer >= this.interval()) {
      this.timer = 0;
      this.frame ^= 1;
      const alive = this.alive;
      const minX = Math.min(...alive.map(i => i.x));
      const maxX = Math.max(...alive.map(i => i.x + i.w));
      if ((this.dir > 0 && maxX + INV_STEP_X > W - 10) || (this.dir < 0 && minX - INV_STEP_X < 10)) {
        for (const i of alive) i.y += INV_STEP_Y;
        this.dir *= -1;
      } else {
        for (const i of alive) i.x += this.dir * INV_STEP_X;
      }
      ev = 'step';
      if (alive.some(i => i.y + i.h >= SHIELD_Y + 40)) return 'landed';
    }
    return ev;
  }

  // Um invasor da linha de baixo de uma coluna aleatória solta uma bomba
  maybeBomb(dt) {
    this.bombTimer += dt;
    const chance = (BOMB_BASE_CHANCE + this.wave * 0.25) * dt;
    if (Math.random() > chance) return null;
    const alive = this.alive;
    if (!alive.length) return null;
    const cols = [...new Set(alive.map(i => i.col))];
    const col = cols[Math.floor(Math.random() * cols.length)];
    const shooter = alive.filter(i => i.col === col).sort((a, b) => b.y - a.y)[0];
    return { x: shooter.x + shooter.w / 2 - 2, y: shooter.y + shooter.h, w: 4, h: 12, vy: BOMB_SPEED, zig: Math.random() < 0.5 };
  }

  hitTest(b) {
    for (const i of this.alive) {
      if (b.x < i.x + i.w && b.x + b.w > i.x && b.y < i.y + i.h && b.y + b.h > i.y) { i.alive = false; return i; }
    }
    return null;
  }
}
