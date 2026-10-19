import { STATES, COMBO_MAX, ENEMIES_PER_BOSS, DIFFICULTY } from './constants.js';

export class GameState {
    constructor() {
        this.state = STATES.MENU;
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.lives = 3;
        this.level = 1;
        this.levelTimer = 0;
        this.difficulty = DIFFICULTY.NORMAL;
        this.difficultyMult = DIFFICULTY_NORMAL_MULTIPLIERS[this.difficulty];
        this.comboCount = 0;
        this.comboTimer = 0;
        this.bossActive = false;
        this.boss = null;
        this.spawnTimer = 0;
        this.spawnInterval = 90;
        this.enemiesKilledForBoss = 0;
    }

    loadHighScore() {
        try {
            return parseInt(localStorage.getItem('spaceFighterHigh') || '0');
        } catch {
            return 0;
        }
    }

    saveHighScore() {
        try {
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('spaceFighterHigh', this.highScore.toString());
            }
        } catch (e) {
            // localStorage not available
        }
    }

    reset() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.levelTimer = 0;
        this.comboCount = 0;
        this.comboTimer = 0;
        this.bossActive = false;
        this.boss = null;
        this.spawnTimer = 0;
        this.spawnInterval = 90;
        this.enemiesKilledForBoss = 0;
    }

    nextLevel() {
        this.level++;
        this.spawnInterval = Math.max(30, 90 - this.level * 8);
    }
}

export const DIFFICULTY_NORMAL_MULTIPLIERS = {
    [DIFFICULTY.EASY]: { enemyHp: 0.7, enemySpeed: 0.8, fireRate: 1.3, spawnRate: 1.2 },
    [DIFFICULTY.NORMAL]: { enemyHp: 1.0, enemySpeed: 1.0, fireRate: 1.0, spawnRate: 1.0 },
    [DIFFICULTY.HARD]: { enemyHp: 1.5, enemySpeed: 1.2, fireRate: 0.7, spawnRate: 0.8 }
};

export function rectsCollide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
}
