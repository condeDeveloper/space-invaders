// Estados, regras e loop
class Game {
  constructor() {
    this.ctx = document.getElementById('game').getContext('2d');
    this.el = {
      score: document.getElementById('score'), wave: document.getElementById('wave'),
      lives: document.getElementById('lives'), best: document.getElementById('best'),
      overlay: document.getElementById('overlay'),
    };
    this.best = Number(localStorage.getItem('invaders-best') || 0);
    this.player = new Player();
    this.particles = new Particles();
    this.state = 'ready';
    this.firing = false;
    this.newGame();
    bindInput(this);
    this.last = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  newGame() {
    this.score = 0; this.lives = LIVES; this.wave = 1;
    this.startWave();
  }

  startWave() {
    this.invaders = new Invaders(this.wave);
    this.bullets = new Bullets();
    this.shields = new Shields();
    this.ufo = new Ufo();
    this.player.reset();
    this.hud();
  }

  onAny() {
    if (this.state === 'ready') this.start();
    else if (this.state === 'over') { this.newGame(); this.start(); }
    else if (this.state === 'paused') this.start();
  }
  start() { this.state = 'playing'; this.el.overlay.classList.add('hidden'); }
  togglePause() {
    if (this.state === 'playing') { this.state = 'paused'; this.overlay('PAUSA', 'Toque ou pressione uma tecla para continuar'); }
    else this.onAny();
  }

  update(dt, now) {
    this.player.update(dt);
    this.particles.update(dt);

    if (this.firing && this.player.canFire()) { this.bullets.addShot(this.player.fire()); Sound.shoot(); }

    const ev = this.invaders.update(dt);
    if (ev === 'step') Sound.march();
    if (ev === 'landed') return this.gameOver();
    this.shields.crush(this.invaders.alive);

    const bomb = this.player.dead <= 0 ? this.invaders.maybeBomb(dt) : null;
    if (bomb) this.bullets.addBomb(bomb);

    this.ufo.update(dt, this.invaders.count);
    if (this.ufo.active && Math.random() < 0.15) Sound.ufo();

    this.bullets.update(dt);
    this.bullets.shotsVsBombs();

    // tiros do jogador
    for (const s of this.bullets.shots) {
      const inv = this.invaders.hitTest(s);
      if (inv) {
        s.dead = true;
        this.addScore(inv.points, inv.x + inv.w / 2, inv.y);
        this.particles.burst(inv.x + inv.w / 2, inv.y + inv.h / 2, COLORS[inv.type]);
        Sound.hit();
        continue;
      }
      const pts = this.ufo.hitTest(s);
      if (pts) { s.dead = true; this.addScore(pts, s.x, 70, COLORS.ufo); this.particles.burst(s.x, 70, COLORS.ufo, 24); Sound.ufoHit(); continue; }
      if (this.shields.hit(s, 7)) s.dead = true;
    }
    this.bullets.shots = this.bullets.shots.filter(s => !s.dead);

    // bombas
    for (const b of this.bullets.bombs) {
      if (this.shields.hit(b)) { b.dead = true; continue; }
      if (this.player.hitBy(b)) { b.dead = true; this.loseLife(); }
    }
    this.bullets.bombs = this.bullets.bombs.filter(b => !b.dead);

    if (this.invaders.count === 0) this.nextWave();
  }

  addScore(pts, x, y, color = '#fff') {
    this.score += pts;
    this.particles.text(x, y, `+${pts}`, color);
    if (this.score > this.best) { this.best = this.score; localStorage.setItem('invaders-best', this.best); }
    this.hud();
  }

  loseLife() {
    this.lives--;
    this.player.hit();
    this.particles.burst(this.player.cx, this.player.y + 10, COLORS.player, 30);
    Sound.die();
    this.hud();
    if (this.lives <= 0) setTimeout(() => this.gameOver(), 900);
  }

  nextWave() {
    this.wave++;
    Sound.wave();
    this.state = 'paused';
    this.startWave();
    this.overlay(`ONDA ${this.wave}`, `<span class="big">${this.score}</span><br>Toque ou pressione uma tecla para continuar`);
  }

  gameOver() {
    if (this.state === 'over') return;
    this.state = 'over';
    Sound.over();
    this.overlay('GAME OVER', `<span class="big">${this.score} pontos</span><br>Onda ${this.wave} · Toque para jogar de novo`);
  }

  loop(now) {
    const dt = Math.min(0.033, (now - this.last) / 1000);
    this.last = now;
    if (this.state === 'playing') this.update(dt, now);
    drawScene(this.ctx, this, now);
    requestAnimationFrame(t => this.loop(t));
  }

  hud() {
    this.el.score.textContent = String(this.score).padStart(4, '0');
    this.el.best.textContent = String(this.best).padStart(4, '0');
    this.el.wave.textContent = this.wave;
    this.el.lives.textContent = Array(Math.max(0, this.lives)).fill('▲').join(' ') || '—';
  }
  overlay(title, html) {
    this.el.overlay.innerHTML = `<h1>${title}</h1><p>${html}</p>`;
    this.el.overlay.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
