// Barreiras destrutíveis feitas de blocos pequenos
class Shields {
  constructor() {
    this.blocks = [];
    const shape = ['.########.', '##########', '##########', '##########', '###....###', '##......##'];
    const bw = 6, bh = 6;
    const totalW = shape[0].length * bw;
    for (let s = 0; s < SHIELD_COUNT; s++) {
      const x0 = (W / (SHIELD_COUNT + 1)) * (s + 1) - totalW / 2;
      shape.forEach((row, r) => {
        [...row].forEach((ch, c) => {
          if (ch === '#') this.blocks.push({ x: x0 + c * bw, y: SHIELD_Y + r * bh, w: bw, h: bh });
        });
      });
    }
  }

  // Remove o bloco atingido e alguns vizinhos (efeito de lasca). Retorna true se atingiu.
  hit(b, radius = 9) {
    let idx = -1;
    for (let i = 0; i < this.blocks.length; i++) {
      const k = this.blocks[i];
      if (b.x < k.x + k.w && b.x + b.w > k.x && b.y < k.y + k.h && b.y + b.h > k.y) { idx = i; break; }
    }
    if (idx < 0) return false;
    const hitBlock = this.blocks[idx];
    const cx = hitBlock.x + hitBlock.w / 2, cy = hitBlock.y + hitBlock.h / 2;
    this.blocks = this.blocks.filter(k => Math.hypot(k.x + k.w / 2 - cx, k.y + k.h / 2 - cy) > radius || Math.random() < 0.25);
    return true;
  }

  // Invasores que passam por cima destroem as barreiras
  crush(invaders) {
    for (const i of invaders) {
      this.blocks = this.blocks.filter(k => !(k.x < i.x + i.w && k.x + k.w > i.x && k.y < i.y + i.h && k.y + k.h > i.y));
    }
  }
}
