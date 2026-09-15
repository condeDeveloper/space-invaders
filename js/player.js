// Nave do jogador
class Player {
  constructor() { this.reset(); }
  reset() {
    this.w = PLAYER_W; this.h = PLAYER_H;
    this.x = W / 2 - this.w / 2; this.y = PLAYER_Y;
    this.dir = 0; this.cooldown = 0; this.dead = 0; // dead > 0: ms restantes de explosão
  }
  get cx() { return this.x + this.w / 2; }

  update(dt) {
    if (this.dead > 0) { this.dead -= dt * 1000; return; }
    this.x += this.dir * PLAYER_SPEED * dt;
    this.x = Math.max(10, Math.min(W - this.w - 10, this.x));
    this.cooldown = Math.max(0, this.cooldown - dt * 1000);
  }

  canFire() { return this.dead <= 0 && this.cooldown <= 0; }
  fire() { this.cooldown = PLAYER_COOLDOWN; return { x: this.cx - 1.5, y: this.y - 8, w: 3, h: 12, vy: -BULLET_SPEED }; }
  hit() { this.dead = 1200; }
  hitBy(b) { return this.dead <= 0 && b.x < this.x + this.w && b.x + b.w > this.x && b.y < this.y + this.h && b.y + b.h > this.y; }
}
