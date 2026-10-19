import { CANVAS_WIDTH, CANVAS_HEIGHT, ENEMY_POINTS, ENEMY_HP, ENEMY_SPEED, COMBO_MAX, POWER_LEVELS, BOSS_TYPES, BOSS_CONFIG } from './constants.js';

const BULLET_SPEED = 7;
const PLAYER_SPEED = 5;
const PLAYER_W = 18;
const PLAYER_H = 28;

export class Player {
    constructor() {
        this.x = CANVAS_WIDTH / 2 - PLAYER_W / 2;
        this.y = CANVAS_HEIGHT - 80;
        this.w = PLAYER_W;
        this.h = PLAYER_H;
        this.speed = PLAYER_SPEED;
        this.fireRate = 12;
        this.fireCooldown = 0;
        this.invincible = 0;
        this.powerLevel = POWER_LEVELS.SINGLE;
        this.shieldActive = false;
        this.shieldHP = 0;
        this.bombs = 1;
        this.maxBombs = 3;
        this.extraPowerCollected = 0;
        this.fireSequence = 0;
    }

    reset() {
        this.x = CANVAS_WIDTH / 2 - PLAYER_W / 2;
        this.y = CANVAS_HEIGHT - 100;
        this.fireRate = 12;
        this.fireCooldown = 0;
        this.invincible = 0;
        this.powerLevel = POWER_LEVELS.SINGLE;
        this.shieldActive = false;
        this.shieldHP = 0;
        this.bombs = 1;
        this.maxBombs = 3;
        this.extraPowerCollected = 0;
        this.fireSequence = 0;
    }

    move(dx, dy) {
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        // Clamp
        this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.w, this.x));
        this.y = Math.max(0, Math.min(CANVAS_HEIGHT - this.h, this.y));
    }

    update() {
        if (this.invincible > 0) this.invincible--;
        if (this.fireCooldown > 0) this.fireCooldown--;
    }

    canFire() {
        return this.fireCooldown <= 0;
    }

    fire() {
        this.fireCooldown = this.fireRate;
        const seq = this.fireSequence;
        this.fireSequence++;
        return createBullets(this, seq);
    }

    addPower() {
        this.powerLevel = Math.min(this.powerLevel + 1, POWER_LEVELS.WIDE);
        this.fireRate = Math.max(5, 12 - this.powerLevel * 3);
    }

    addShield() {
        this.shieldActive = true;
        this.shieldHP = 8;
    }

    addBomb() {
        this.bombs = Math.min(this.bombs + 1, 3);
    }

    useBomb(bullets, enemies, boss, particles, canvasWidth, canvasHeight) {
        if (this.bombs <= 0) return false;
        this.bombs--;

        // Damage all enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            e.hp -= 100;
            if (e.hp <= 0) {
                particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, e.type === 'type3' ? 25 : 15, 'enemy'));
            }
        }

        // Damage boss
        if (boss && boss.hp > 0 && boss.entered) {
            boss.hp -= 50;
            particles.push(...createExplosion(boss.x + boss.w / 2, boss.y + boss.h / 2, 30, 'boss'));
            if (boss.hp <= 0) {
                particles.push(...createExplosion(boss.x + boss.w / 2, boss.y + boss.h / 2, 80, 'boss'));
            }
        }

        // Screen flash
        return true;
    }

    takeHit() {
        if (this.invincible > 0) return false;

        if (this.shieldActive) {
            this.shieldHP -= 1;
            if (this.shieldHP <= 0) {
                this.shieldActive = false;
                this.shieldHP = 0;
            }
            return false;
        }

        this.invincible = 120;
        return true;
    }
}

function createBullets(player, fireSequence) {
    const bullets = [];
    const dmg = (10 + player.powerLevel * 5) / 2;
    const interval = 6 - player.powerLevel;
    const isPowerShot = fireSequence % interval === interval - 1;

    bullets.push(createPlayerBullet(player.x + player.w / 2 - 6, player.y - 12, -BULLET_SPEED, Math.ceil(isPowerShot ? dmg * 3 : dmg), isPowerShot));

    if (player.powerLevel >= POWER_LEVELS.DOUBLE) {
        bullets.push(createPlayerBullet(player.x + player.w / 4 - 6, player.y, -BULLET_SPEED, dmg));
        bullets.push(createPlayerBullet(player.x + player.w * 3 / 4 - 6, player.y, -BULLET_SPEED, dmg));
    }
    if (player.powerLevel >= POWER_LEVELS.TRIPLE) {
        bullets.push(createPlayerBullet(player.x, player.y + 30, -BULLET_SPEED, dmg));
        bullets.push(createPlayerBullet(player.x + player.w, player.y + 30, -BULLET_SPEED, dmg));
    }

    return bullets;
}

function createPlayerBullet(x, y, vy, damage, isPowerShot = false) {
    return {
        x, y, w: 12, h: 36, vy, vx: 0, damage, isPowerShot, active: true,
        update() {
            this.y += this.vy;
            this.x += this.vx;
            if (this.y < -60 || this.y > CANVAS_HEIGHT + 60 || this.x < -60 || this.x > CANVAS_WIDTH + 60) {
                this.active = false;
            }
        }
    };
}

export class Bullet {
    constructor(x, y, vy, damage, isEnemy = false) {
        this.x = x;
        this.y = y;
        this.w = isEnemy ? 14 : 12;
        this.h = isEnemy ? 14 : 6;
        this.vy = vy;
        this.vx = 0;
        this.damage = damage;
        this.isEnemy = isEnemy;
        this.active = true;
    }

    update() {
        this.y += this.vy;
        this.x += this.vx;

        // Check bounds
        if (this.y < -60 || this.y > CANVAS_HEIGHT + 60 || this.x < -60 || this.x > CANVAS_WIDTH + 60) {
            this.active = false;
        }
    }
}

export class Enemy {
    constructor(type, difficultyMultiplier) {
        this.type = type;
        const hpMult = difficultyMultiplier.enemyHp || 1;
        const speedMult = difficultyMultiplier.enemySpeed || 1;

        this.w = 27;
        this.h = 27;
        this.hp = ENEMY_HP[type] * hpMult;
        this.maxHp = this.hp;
        this.speed = ENEMY_SPEED[type] * speedMult;
        this.fireRate = Math.ceil((type === 'type3' ? 60 : (type === 'type2' ? 90 : 120)) * 3);
        this.fireCooldown = Math.random() * this.fireRate;
        this.points = ENEMY_POINTS[type];

        // Movement pattern
        this.movePattern = Math.random() < 0.8 ? 'sine' : 'straight';
        this.sineOffset = Math.random() * Math.PI * 2;
        this.sineAmp = 80 + Math.random() * 100;

        // Spawn offscreen
        this.x = Math.random() * (CANVAS_WIDTH - this.w);
        this.y = -this.h;
        this.active = true;
    }

    update() {
        this.y += this.speed;

        if (this.movePattern === 'sine') {
            this.sineOffset += 0.05;
            this.x += Math.sin(this.sineOffset) * this.sineAmp * 0.03;
        }

        this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.w, this.x));

        this.fireCooldown--;

        if (this.y > CANVAS_HEIGHT + 150) {
            this.active = false;
        }
    }

    needsBullet() {
        return this.y > 0 && this.y < CANVAS_HEIGHT - 300 && this.fireCooldown <= 0;
    }

    spawnBullet() {
        this.fireCooldown = this.fireRate;
        return new Bullet(
            this.x + this.w / 2 - 7,
            this.y + this.h,
            2.5 + Math.random() * 1.5,
            10,
            true
        );
    }

    takeDamage(amount) {
        this.hp -= amount;
        return this.hp <= 0;
    }
}

export class Boss {
    constructor(level, difficultyMultiplier, bossType = BOSS_TYPES.PHASE) {
        const config = BOSS_CONFIG[bossType];
        this.w = config.width;
        this.h = config.height;
        this.type = bossType;
        const levelMultiplier = 1 + (level - 1) * 0.15;
        this.hp = Math.floor((500 + level * 200) * config.hpMultiplier * levelMultiplier) * (difficultyMultiplier.enemyHp || 1);
        this.maxHp = this.hp;
        this.speed = 1;
        this.phase = 0;
        this.phaseTimer = 0;
        this.fireRate = config.fireRate;
        this.fireCooldown = 0;
        this.points = ENEMY_POINTS.boss;
        this.bodyColor = config.bodyColor;
        this.armorColor = config.armorColor;
        this.coreColor = config.coreColor;

        this.x = CANVAS_WIDTH / 2 - this.w / 2;
        this.y = -this.h;
        this.entering = true;
        this.entered = false;
        this.active = true;
    }

    update(targetX) {
        if (this.entering) {
            this.y += 2;
            if (this.y >= 90) {
                this.entering = false;
                this.entered = true;
                this.y = 90;
            }
            return;
        }

        this.phaseTimer++;
        if (this.phaseTimer > 180) {
            this.phase = (this.phase + 1) % 3;
            this.phaseTimer = 0;
        }

        switch (this.type) {
            case BOSS_TYPES.PHASE:
                switch (this.phase) {
                    case 0:
                        this.x += Math.sin(Date.now() / 800) * 3;
                        break;
                    case 1:
                        this.x += Math.sign(targetX - (this.x + this.w / 2)) * 2;
                        break;
                    case 2:
                        this.x += Math.cos(Date.now() / 600) * 2;
                        break;
                }
                break;
            case BOSS_TYPES.ASSAULT:
                switch (this.phase) {
                    case 0:
                        this.x += Math.sin(Date.now() / 600) * 4;
                        break;
                    case 1:
                        this.x += Math.sign(targetX - (this.x + this.w / 2)) * 3;
                        break;
                    case 2:
                        this.x += Math.cos(Date.now() / 400) * 3;
                        break;
                }
                break;
            case BOSS_TYPES.TITAN:
                this.x += Math.sin(this.phaseTimer * 0.02) * 1.5;
                break;
        }

        this.x = Math.max(0, Math.min(CANVAS_WIDTH - this.w, this.x));

        this.fireCooldown--;
    }

    needsBullet() {
        return this.entered && this.fireCooldown <= 0;
    }

    spawnBullets() {
        this.fireCooldown = this.fireRate;

        if (this.type === BOSS_TYPES.PHASE) {
            const pattern = Math.floor(Math.random() * 3);
            if (pattern === 0) {
                const bullets = [];
                for (let a = -2; a <= 2; a++) {
                    bullets.push(new Bullet(
                        this.x + this.w / 2 - 7,
                        this.y + this.h,
                        3,
                        15,
                        true
                    ));
                    bullets[bullets.length - 1].vx = a * 2;
                }
                return bullets;
            } else if (pattern === 1) {
                return [new Bullet(
                    this.x + this.w / 2 - 7,
                    this.y + this.h,
                    3,
                    20,
                    true
                )];
            } else {
                return [
                    new Bullet(this.x - 14, this.y + this.h / 2, 3, 15, true),
                    new Bullet(this.x + this.w - 14, this.y + this.h / 2, 3, 15, true)
                ];
            }
        } else if (this.type === BOSS_TYPES.ASSAULT) {
            const pattern = Math.floor(Math.random() * 2);
            if (pattern === 0) {
                const bullets = [];
                for (let a = -3; a <= 3; a++) {
                    bullets.push(new Bullet(
                        this.x + this.w / 2 - 7,
                        this.y + this.h,
                        4,
                        18,
                        true
                    ));
                    bullets[bullets.length - 1].vx = a * 2.5;
                }
                return bullets;
            } else {
                const bullets = [];
                for (let a = 0; a < 5; a++) {
                    const delay = a * 5;
                    const b = new Bullet(
                        this.x + this.w / 2 - 7 + (a - 2) * 15,
                        this.y + this.h,
                        5,
                        20,
                        true
                    );
                    bullets.push(b);
                }
                return bullets;
            }
        } else {
            const pattern = Math.floor(Math.random() * 3);
            if (pattern === 0) {
                const bullets = [];
                for (let a = -2; a <= 2; a += 2) {
                    bullets.push(new Bullet(
                        this.x + this.w / 2 - 7,
                        this.y + this.h,
                        2,
                        25,
                        true
                    ));
                    bullets[bullets.length - 1].vx = a * 1.5;
                }
                return bullets;
            } else if (pattern === 1) {
                const bullets = [];
                for (let a = 0; a < 8; a++) {
                    const angle = (Math.PI / 4) * a;
                    const b = new Bullet(
                        this.x + this.w / 2,
                        this.y + this.h / 2,
                        Math.cos(angle) * 3,
                        15,
                        true
                    );
                    b.vx = Math.sin(angle) * 3;
                    b.vy = Math.abs(Math.cos(angle)) * 3;
                    bullets.push(b);
                }
                return bullets;
            } else {
                const bullets = [];
                for (let a = 0; a < 6; a++) {
                    const b = new Bullet(
                        this.x + a * 50,
                        this.y + this.h,
                        3,
                        20,
                        true
                    );
                    bullets.push(b);
                }
                return bullets;
            }
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        return this.hp <= 0;
    }
}

export class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.w = 54;
        this.h = 54;
        this.type = type;
        this.vy = 1;
        this.life = 600;
        this.active = true;
    }

    update() {
        this.y += this.vy;
        this.life--;

        if (this.y > CANVAS_HEIGHT + 45 || this.life <= 0) {
            this.active = false;
        }
    }
}

export function createExplosion(x, y, count, type = 'type1') {
    const particles = [];
    const typeColors = {
        type1: ['#f44', '#f80', '#ff0', '#fff'],
        type2: ['#f0f', '#a0f', '#fff', '#f8f'],
        type3: ['#0f0', '#ff0', '#fff', '#0a0'],
        boss: ['#f00', '#ff0', '#fff', '#f80', '#fa0'],
        enemy: ['#f00', '#d00', '#b00', '#a00']
    };

    const colors = type === 'boss' ? typeColors.boss : (typeColors[type] || typeColors.enemy);

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 4;
        particles.push({
            x, y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            life: 1,
            decay: 0.01 + Math.random() * 0.03,
            size: 3 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    return particles;
}

export function createSparks(x, y, count) {
    const particles = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 2 + Math.random() * 5;
        particles.push({
            x, y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            life: 1,
            decay: 0.02 + Math.random() * 0.04,
            size: 1.5 + Math.random() * 3,
            color: `hsl(${30 + Math.random() * 30}, 100%, ${50 + Math.random() * 50}%)`
        });
    }
    return particles;
}

export { BOSS_TYPES, BOSS_CONFIG } from './constants.js';
