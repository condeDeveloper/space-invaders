# 👾 Space Invaders

Space Invaders em HTML5 Canvas + JavaScript puro, com sprites em pixel art desenhados em código. Sem dependências, sem build.

**Jogar online:** https://condedeveloper.github.io/space-invaders/

## Rodar local

```bash
npx serve -l 5191 .
```

## Controles

| Ação    | Tecla / gesto                          |
|---------|----------------------------------------|
| Mover   | ← → ou A D · arrastar o dedo no celular |
| Atirar  | Espaço · toque na tela · botão FOGO     |
| Pausar  | P ou Esc                                |

## Funcionalidades

- 55 invasores em 5 fileiras, com sprites de dois quadros e três tipos (30, 20 e 10 pontos)
- A formação acelera conforme os invasores morrem e a cada onda
- Marcha com as quatro notas graves clássicas
- Bombas retas e em zigue-zague; o tiro do jogador pode destruí-las
- Quatro barreiras destrutíveis bloco a bloco, esmagadas se os invasores passarem por cima
- Nave misteriosa com pontuação aleatória (50 a 300)
- Um tiro na tela por vez, como no arcade
- Ondas infinitas, começando mais baixas e mais agressivas
- Partículas, pontos flutuantes, Hi-Score no `localStorage`

## Estrutura

```
js/config.js     # constantes
js/sprites.js    # pixel art em matrizes de texto
js/player.js     # nave
js/invaders.js   # formação, marcha, bombas
js/bullets.js    # tiros e bombas
js/shields.js    # barreiras destrutíveis
js/ufo.js        # nave misteriosa
js/particles.js  # explosões e textos
js/render.js     # desenho
js/audio.js      # sons
js/input.js      # teclado, toque
js/game.js       # ondas, vidas, loop
```

## Licença

MIT
