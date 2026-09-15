// Desenho da cena
function drawScene(ctx, g, now) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // estrelas de fundo
  ctx.fillStyle = 'rgba(255,255,255,.25)';
  for (let i = 0; i < 40; i++) {
    const x = (i * 149) % W, y = ((i * 97) + now * 0.01) % H;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // invasores
  for (const inv of g.invaders.alive) {
    drawSprite(ctx, SPRITES[inv.type][g.invaders.frame], inv.x, inv.y, inv.w, inv.h, COLORS[inv.type]);
  }

  // ufo
  if (g.ufo.active) drawSprite(ctx, SPRITES.ufo[0], g.ufo.x, g.ufo.y, g.ufo.w, g.ufo.h, COLORS.ufo);

  // barreiras
  ctx.fillStyle = COLORS.shield;
  for (const k of g.shields.blocks) ctx.fillRect(k.x, k.y, k.w, k.h);

  // tiros e bombas
  ctx.fillStyle = COLORS.bullet;
  for (const s of g.bullets.shots) ctx.fillRect(s.x, s.y, s.w, s.h);
  ctx.fillStyle = COLORS.bomb;
  for (const b of g.bullets.bombs) {
    // bomba em zigue-zague desenhada como raio
    ctx.fillRect(b.x, b.y, b.w, b.h / 3);
    ctx.fillRect(b.x + (b.zig ? 2 : 0), b.y + b.h / 3, b.w, b.h / 3);
    ctx.fillRect(b.x, b.y + (2 * b.h) / 3, b.w, b.h / 3);
  }

  // jogador
  if (g.player.dead <= 0) {
    drawSprite(ctx, SPRITES.player[0], g.player.x, g.player.y, g.player.w, g.player.h, COLORS.player);
  } else if (Math.floor(g.player.dead / 100) % 2 === 0) {
    // explosão piscando
    ctx.fillStyle = COLORS.player;
    for (let i = 0; i < 6; i++) ctx.fillRect(g.player.x + Math.random() * g.player.w, g.player.y + Math.random() * g.player.h, 4, 4);
  }

  g.particles.draw(ctx);

  // chão
  ctx.fillStyle = COLORS.player;
  ctx.fillRect(0, GROUND_Y, W, 2);
}
