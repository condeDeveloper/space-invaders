// Explosões em pixels e textos flutuantes de pontos
class Particles {
  constructor() { this.list = []; this.texts = []; }

  burst(x, y, color, n = 14) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = 40 + Math.random() * 160;
      this.list.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.5 + Math.random() * 0.4, color, size: 2 + Math.random() * 3 });
    }
  }
  text(x, y, str, color = '#fff') { this.texts.push({ x, y, str, color, life: 1 }); }

  update(dt) {
    for (const p of this.list) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
    for (const t of this.texts) { t.y -= 30 * dt; t.life -= dt; }
    this.list = this.list.filter(p => p.life > 0);
    this.texts = this.texts.filter(t => t.life > 0);
  }

  draw(ctx) {
    for (const p of this.list) { ctx.globalAlpha = Math.min(1, p.life * 2); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size); }
    ctx.globalAlpha = 1;
    ctx.font = 'bold 14px "Courier New", monospace'; ctx.textAlign = 'center';
    for (const t of this.texts) { ctx.globalAlpha = t.life; ctx.fillStyle = t.color; ctx.fillText(t.str, t.x, t.y); }
    ctx.globalAlpha = 1;
  }
}
