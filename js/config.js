// Constantes
const W = 600, H = 700;
const PLAYER_W = 44, PLAYER_H = 24, PLAYER_Y = H - 70, PLAYER_SPEED = 300;
const PLAYER_COOLDOWN = 380;       // ms entre tiros
const BULLET_SPEED = 520, BOMB_SPEED = 220;
const INV_COLS = 11, INV_ROWS = 5, INV_W = 32, INV_H = 24, INV_GAP_X = 14, INV_GAP_Y = 16;
const INV_TOP = 110, INV_STEP_X = 10, INV_STEP_Y = 18;
const INV_BASE_INTERVAL = 800;     // ms por passo da formação no início
const INV_MIN_INTERVAL = 60;
const BOMB_BASE_CHANCE = 0.9;      // bombas por segundo (aumenta com a onda)
const SHIELD_COUNT = 4, SHIELD_Y = H - 150;
const UFO_INTERVAL = [14000, 26000]; // ms entre aparições
const UFO_SPEED = 120;
const UFO_POINTS = [50, 100, 150, 300];
const LIVES = 3;
const GROUND_Y = H - 30;

// Pontuação por linha (de cima para baixo)
const ROW_POINTS = [30, 20, 20, 10, 10];
const ROW_TYPE = ['a', 'b', 'b', 'c', 'c'];
const COLORS = { a: '#f472b6', b: '#38bdf8', c: '#a3e635', ufo: '#f87171', player: '#3dff6e', shield: '#3dff6e', bullet: '#fff', bomb: '#facc15' };
