// Tiros do jogador e bombas dos invasores
class Bullets {
  constructor() { this.shots = []; this.bombs = []; }

  addShot(b) { if (this.shots.length < 1) this.shots.push(b); } // um tiro por vez, como no original
  addBomb(b) { this.bombs.push(b); }

  update(dt) {
    for (const s of this.shots) s.y += s.vy * dt;
    for (const b of this.bombs) {
      b.y += b.vy * dt;
      if (b.zig) b.x += Math.sin(b.y / 12) * 1.2;
    }
    this.shots = this.shots.filter(s => s.y + s.h > 0);
    this.bombs = this.bombs.filter(b => b.y < GROUND_Y);
  }

  // Tiro do jogador encontra bomba: ambos somem
  shotsVsBombs() {
    let hits = 0;
    for (const s of this.shots) {
      for (const b of this.bombs) {
        if (!b.dead && !s.dead && s.x < b.x + b.w && s.x + s.w > b.x && s.y < b.y + b.h && s.y + s.h > b.y) { s.dead = b.dead = true; hits++; }
      }
    }
    if (hits) { this.shots = this.shots.filter(s => !s.dead); this.bombs = this.bombs.filter(b => !b.dead); }
    return hits;
  }

  clear() { this.shots = []; this.bombs = []; }
}
