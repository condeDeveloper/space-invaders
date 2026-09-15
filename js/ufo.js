// Nave misteriosa que cruza o topo da tela de vez em quando
class Ufo {
  constructor() { this.active = false; this.schedule(); }

  schedule() {
    const [a, b] = UFO_INTERVAL;
    this.timer = a + Math.random() * (b - a);
  }

  update(dt, invadersLeft) {
    if (this.active) {
      this.x += this.vx * dt;
      if (this.x < -60 || this.x > W + 60) { this.active = false; this.schedule(); }
      return;
    }
    if (invadersLeft < 8) return; // como no original, não aparece com poucos invasores
    this.timer -= dt * 1000;
    if (this.timer <= 0) {
      this.active = true;
      const fromLeft = Math.random() < 0.5;
      this.x = fromLeft ? -50 : W + 50;
      this.vx = (fromLeft ? 1 : -1) * UFO_SPEED;
      this.y = 60; this.w = 48; this.h = 20;
    }
  }

  hitTest(b) {
    if (!this.active) return 0;
    if (b.x < this.x + this.w && b.x + b.w > this.x && b.y < this.y + this.h && b.y + b.h > this.y) {
      this.active = false; this.schedule();
      return UFO_POINTS[Math.floor(Math.random() * UFO_POINTS.length)];
    }
    return 0;
  }
}
