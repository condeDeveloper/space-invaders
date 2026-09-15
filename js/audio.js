// Sons sintetizados com WebAudio, incluindo as quatro notas da marcha
const Sound = (() => {
  let ctx, marchStep = 0;
  function tone(freq, dur, type = 'square', vol = 0.05) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (_) {}
  }
  function noise(dur, vol = 0.08) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const s = ctx.createBufferSource(), g = ctx.createGain();
      s.buffer = buf; g.gain.value = vol;
      s.connect(g).connect(ctx.destination); s.start();
    } catch (_) {}
  }
  const MARCH = [110, 104, 98, 92];
  return {
    march:   () => { tone(MARCH[marchStep], 0.09, 'square', 0.04); marchStep = (marchStep + 1) % 4; },
    shoot:   () => tone(900, 0.08, 'sawtooth', 0.04),
    hit:     () => noise(0.12, 0.08),
    ufo:     () => tone(600 + Math.random() * 200, 0.05, 'triangle', 0.02),
    ufoHit:  () => [700, 900, 1200].forEach((f, i) => setTimeout(() => tone(f, 0.1, 'square', 0.06), i * 60)),
    die:     () => noise(0.5, 0.15),
    wave:    () => [392, 523, 659, 784].forEach((f, i) => setTimeout(() => tone(f, 0.15, 'square', 0.05), i * 100)),
    over:    () => [300, 200, 120, 80].forEach((f, i) => setTimeout(() => tone(f, 0.3, 'sawtooth', 0.06), i * 200)),
  };
})();
