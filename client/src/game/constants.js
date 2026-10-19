export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;
export const ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT;

export const STATES = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAMEOVER: 'gameover'
};

export const KEYS = {
    ENTER: 'Enter',
    SPACE: 'Space',
    ESCAPE: 'Escape',
    KEY_W: 'KeyW',
    KEY_A: 'KeyA',
    KEY_S: 'KeyS',
    KEY_D: 'KeyD',
    KEY_B: 'KeyB',
    ARROW_UP: 'ArrowUp',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_DOWN: 'ArrowDown',
    ARROW_RIGHT: 'ArrowRight',
    KEY_K: 'KeyK',
    KEY_L: 'KeyL',
    KEY_I: 'KeyI',
    KEY_J: 'KeyJ'
};

export const DIFFICULTY = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard'
};

export const COLOR = {
    CYAN: '#0ff',
    BLUE: '#0af',
    DARK_BLUE: '#06c',
    RED: '#f33',
    DARK_RED: '#922',
    DARKER_RED: '#600',
    ORANGE: '#f80',
    YELLOW: '#ff0',
    WHITE: '#fff',
    PURPLE: '#a0f',
    GREEN: '#0f0',
    DARK_GREEN: '#0a0',
    MAGENTA: '#f0f',
    DARK_BG: '#05050f',
    HUD_TEXT: '#0ff',
    GRAY: '#888'
};

export const COMBO_MAX = 10;
export const ENEMIES_PER_BOSS = 20;
export const LEVEL_DURATION = 1800; // frames (30s at 60fps)
export const FPS = 60;

export const POWER_LEVELS = {
    SINGLE: 1,
    DOUBLE: 2,
    TRIPLE: 3,
    WIDE: 4
};

export const SHIP_COLORS = {
    PLAYER_BODY: '#0af',
    PLAYER_COCKPIT: '#0ff',
    PLAYER_WINGS: '#06c',
    ENEMY1_BODY: '#c33',
    ENEMY1_WINGS: '#922',
    ENEMY2_BODY: '#a0f',
    ENEMY2_SPIKES: '#80d',
    BOSS_HULL: '#600',
    BOSS_ARMOR: '#900'
};

export const BOSS_TYPES = {
    PHASE: 'phase',
    ASSAULT: 'assault',
    TITAN: 'titan'
};

export const BOSS_CONFIG = {
    [BOSS_TYPES.PHASE]: {
        name: 'Phase Boss',
        hpMultiplier: 1.0,
        fireRate: 60,
        width: 324,
        height: 270,
        bodyColor: '#600',
        armorColor: '#900',
        coreColor: '#f80'
    },
    [BOSS_TYPES.ASSAULT]: {
        name: 'Assault Boss',
        hpMultiplier: 1.2,
        fireRate: 40,
        width: 300,
        height: 250,
        bodyColor: '#060',
        armorColor: '#090',
        coreColor: '#0f0'
    },
    [BOSS_TYPES.TITAN]: {
        name: 'Titan Boss',
        hpMultiplier: 1.5,
        fireRate: 80,
        width: 360,
        height: 300,
        bodyColor: '#660',
        armorColor: '#990',
        coreColor: '#ff0'
    }
};

export const ENEMY_POINTS = {
    type1: 15,
    type2: 30,
    type3: 50,
    boss: 500
};

export const ENEMY_HP = {
    type1: 15,
    type2: 30,
    type3: 100
};

export const ENEMY_SPEED = {
    type1: 0.8,
    type2: 1.0,
    type3: 0.5
};

export const POWERUP_TYPES = {
    HEALTH: 'health',
    POWER: 'power',
    SHIELD: 'shield',
    BOMB: 'bomb'
};

export const POWERUP_WEIGHTS = {
    health: 0.35,
    power: 0.35,
    shield: 0.20,
    bomb: 0.10
};

export const DIFFICULTY_MULTIPLIERS = {
    [DIFFICULTY.EASY]: { enemyHp: 0.7, enemySpeed: 0.8, fireRate: 1.3, spawnRate: 1.2 },
    [DIFFICULTY.NORMAL]: { enemyHp: 1.0, enemySpeed: 1.0, fireRate: 1.0, spawnRate: 1.0 },
    [DIFFICULTY.HARD]: { enemyHp: 1.5, enemySpeed: 1.2, fireRate: 0.7, spawnRate: 0.8 }
};
