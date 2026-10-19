import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { useResponsiveCanvas } from '../hooks/useResponsiveCanvas.jsx';
import { initInput, destroyInput, getDirection, isPressed, wasPressed, clearKey } from '../game/input.js';
import { Player, Enemy, Boss, Powerup, Bullet, createExplosion, createSparks, BOSS_TYPES } from '../game/entities.js';
import {
    drawPlayerShip, drawEnemyType1, drawEnemyType2, drawEnemyType3,
    drawBossType1, drawBossType2, drawBossType3, drawBullet, drawPowerup, drawParticles, drawStars, updateStars
} from '../game/render.js';
import { rectsCollide, DIFFICULTY_NORMAL_MULTIPLIERS } from '../game/engine.js';
import { STATES, KEYS, CANVAS_WIDTH, CANVAS_HEIGHT, DIFFICULTY, BOSS_CONFIG, ENEMY_POINTS, POWER_LEVELS } from '../game/constants.js';
import {
    playPowerUpSound, playShieldActivateSound, playEnemyDeathSound,
    playBossDeathSound, startBgm, stopBgm
} from '../game/audio.js';

const handleDeathRef = { current: null };
let frameCounter = 0;

export default function Game() {
    const containerRef = useRef(null);
    const gameLoopRef = useRef(null);

    const { canvasRef, scale } = useResponsiveCanvas(containerRef, (canvas) => {
        if (canvas) {
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
        }
    });

    // Initialize game state
    const initGameState = useCallback(() => {
        return {
            state: STATES.MENU,
            score: 0,
            highScore: parseInt(localStorage.getItem('spaceFighterHigh') || '0'),
            lives: 3,
            level: 1,
            levelTimer: 0,
            difficulty: DIFFICULTY.NORMAL,
            comboCount: 0,
            comboTimer: 0,
            bossActive: false,
            boss: null,
            bossTypeCounter: 0,
            spawnTimer: 0,
            spawnInterval: 150,
            enemiesKilledForBoss: 0,
            shakeTimer: 0,
            shakeIntensity: 0,

            player: new Player(),
            playerBullets: [],
            enemyBullets: [],
            enemies: [],
            powerups: [],
            particles: [],
            stars: generateStars(),
            powerupTimer: 0,

            // UI state
            showNewHighScore: false,

            difficultyMult: DIFFICULTY_NORMAL_MULTIPLIERS[DIFFICULTY.NORMAL]
        };
    }, []);

    const gameState = useRef(initGameState()).current;

    useEffect(() => {
        handleDeathRef.current = () => {
            gameState.state = STATES.GAMEOVER;
            gameState.showNewHighScore = gameState.score >= gameState.highScore && gameState.score > 0;
            if (gameState.score > gameState.highScore) {
                gameState.highScore = gameState.score;
                localStorage.setItem('spaceFighterHigh', gameState.highScore.toString());
            }
            stopBgm();
        };
    }, [gameState]);

    // Handle game state changes from child components
    // Start game from menu
    const startGame = useCallback(() => {
        gameState.state = STATES.PLAYING;
        startBgm();
    }, [gameState]);

    // Reset game completely
    const resetGame = useCallback(() => {
        gameState.state = STATES.PLAYING;
        gameState.score = 0;
        gameState.lives = 3;
        gameState.level = 1;
        gameState.levelTimer = 0;
        gameState.player = new Player();
        gameState.playerBullets = [];
        gameState.enemyBullets = [];
        gameState.enemies = [];
        gameState.powerups = [];
        gameState.particles = [];
        gameState.powerupTimer = 0;
        gameState.bossActive = false;
        gameState.boss = null;
        gameState.comboCount = 0;
        gameState.comboTimer = 0;
        gameState.spawnTimer = 0;
        gameState.spawnInterval = 150;
        gameState.enemiesKilledForBoss = 0;
        gameState.bossTypeCounter = 0;
        gameState.shakeTimer = 0;
        gameState.shakeIntensity = 0;
        gameState.showNewHighScore = false;
        startBgm();
    }, [gameState]);

    // Toggle pause
    const togglePause = useCallback(() => {
        if (gameState.state === STATES.PLAYING) {
            gameState.state = STATES.PAUSED;
        } else if (gameState.state === STATES.PAUSED) {
            gameState.state = STATES.PLAYING;
        }
    }, [gameState]);

    // Use bomb powerup
    const useBomb = useCallback(() => {
        const state = gameState;
        if (!state.player || !state.player.bombs || state.player.bombs <= 0) return;
        if (state.state !== STATES.PLAYING) return;

        state.player.bombs--;

        // Damage all enemies
        for (let i = state.enemies.length - 1; i >= 0; i--) {
            const e = state.enemies[i];
            e.hp -= 300;
            if (e.hp <= 0) {
                state.particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, 60, 'enemy'));
                state.enemies.splice(i, 1);
                state.enemiesKilledForBoss++;
                state.score += ENEMY_POINTS[e.type] || 50;
                state.comboCount = 0;
                state.comboTimer = 0;
            }
        }

        // Damage boss
        if (state.boss && state.boss.hp > 0) {
            const bossPoints = state.boss.points || 500;
            state.boss.hp -= 300;
            state.particles.push(...createExplosion(state.boss.x + state.boss.w / 2, state.boss.y + state.boss.h / 2, 90, 'boss'));
            if (state.boss.hp <= 0) {
                state.particles.push(...createExplosion(state.boss.x + state.boss.w / 2, state.boss.y + state.boss.h / 2, 240, 'boss'));
                state.boss = null;
                state.bossActive = false;
                state.enemiesKilledForBoss = 0;
                state.bossTypeCounter = (state.bossTypeCounter + 1) % 3;
                state.score += bossPoints;
                playBossDeathSound();
                state.level++;
                state.spawnInterval = Math.max(30, 90 - state.level * 8);
                state.shakeTimer = 20;
                state.shakeIntensity = 8;
            }
        }

        state.shakeTimer = 15;
        state.shakeIntensity = 5;
    }, [gameState]);

    const bombRef = useRef(useBomb);
    bombRef.current = useBomb;

    useEffect(() => {
        initInput();

        const handleGlobalKeys = (e) => {
            if (gameState.state === STATES.MENU && e.code === KEYS.ENTER) {
                startGame();
            } else if (gameState.state === STATES.GAMEOVER && e.code === KEYS.ENTER) {
                resetGame();
            } else if (gameState.state === STATES.PLAYING && e.code === KEYS.ESCAPE) {
                togglePause();
            } else if (gameState.state === STATES.PAUSED && e.code === KEYS.ESCAPE) {
                togglePause();
            } else if (gameState.state === STATES.PLAYING && e.code === KEYS.KEY_B) {
                bombRef.current();
            }
        };

        window.addEventListener('keydown', handleGlobalKeys);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeys);
            destroyInput();
        };
    }, [startGame, resetGame, togglePause]);

    const gameLoop = useCallback((time) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            gameLoopRef.current = requestAnimationFrame(gameLoop);
            return;
        }

        frameCounter++;
        const ctx = canvas.getContext('2d');
        const state = gameState;
        const t = time || Date.now();

        // Update based on state
        if (state.state === STATES.PLAYING) {
            updateGame(state, t, scale);
        } else {
            updateStars(state.stars, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        // Draw
        drawGame(ctx, state, t, canvas.width, canvas.height, scale, frameCounter);

        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [gameState, canvasRef]);

    useLayoutEffect(() => {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gameLoop]);

    return (
        <div ref={containerRef} className="game-container">
            <canvas
                ref={canvasRef}
                className="game-canvas"
            />
        </div>
    );
}

// ============================================================
//  UPDATE
// ============================================================

function updateGame(state, time, scale) {
    const { player, playerBullets, enemyBullets, enemies, powerups, particles } = state;

    // Player movement
    const { dx, dy } = getDirection();
    player.move(dx, dy);
    player.update();

    // Firing
    if ((isPressed(KEYS.SPACE) || isPressed('MouseLeft')) && player.canFire()) {
        const newBullets = player.fire();
        playerBullets.push(...newBullets);
    }

    // Combo timer
    if (state.comboTimer > 0) {
        state.comboTimer--;
        if (state.comboTimer <= 0) state.comboCount = 0;
    }

    // Update player bullets
    for (let i = playerBullets.length - 1; i >= 0; i--) {
        const b = playerBullets[i];
        b.update();
        if (!b.active) {
            playerBullets.splice(i, 1);
            continue;
        }

        // Check enemy hits
        for (let j = enemies.length - 1; j >= 0; j--) {
            const e = enemies[j];
            if (rectsCollide(b, e)) {
                const killed = e.takeDamage(b.damage);
                playerBullets.splice(i, 1);
                particles.push(...createSparks(b.x, b.y, 15));
                if (killed) {
                    particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, e.type === 'type3' ? 75 : 45, 'enemy'));
                    playEnemyDeathSound();

                    // Combo
                    state.comboCount++;
                    state.comboTimer = 120;
                    const comboMultiplier = Math.min(state.comboCount, 10);

                    state.score += e.points * comboMultiplier;

                    // Powerup drop
                    if (Math.random() < 0.15) {
                        spawnPowerup(e.x + e.w / 2 - 30, e.y + e.h / 2, powerups);
                    }

                    enemies.splice(j, 1);
                    state.enemiesKilledForBoss++;
                }
                break;
            }
        }

        // Check boss hit
        if (state.boss && state.boss.hp > 0 && state.boss.entered) {
            if (rectsCollide(b, state.boss)) {
                state.boss.hp -= b.damage;
                playerBullets.splice(i, 1);
                particles.push(...createSparks(b.x, b.y, 9));

                if (state.boss.hp <= 0) {
                    particles.push(...createExplosion(state.boss.x + state.boss.w / 2, state.boss.y + state.boss.h / 2, 240, 'boss'));
                    state.score += state.boss.points;
                    playBossDeathSound();
                    state.bossTypeCounter = (state.bossTypeCounter + 1) % 3;
                    state.boss = null;
                    state.bossActive = false;
                    state.enemiesKilledForBoss = 0;
                    state.level++;
                    state.spawnInterval = Math.max(50, 150 - state.level * 12);
                    state.shakeTimer = 20;
                    state.shakeIntensity = 8;
                }
            }
        }
    }

    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.update();
        if (!e.active) {
            enemies.splice(i, 1);
            continue;
        }

        // Enemy firing
        if (e.needsBullet()) {
            const bullet = e.spawnBullet();
            enemyBullets.push(bullet);
        }

        // Collision with player
        if (player.invincible <= 0 && rectsCollide(player, e)) {
            if (player.takeHit()) {
                handlePlayerHit(state);
            }
            e.hp -= 150;
            if (e.hp <= 0) {
                particles.push(...createExplosion(e.x + e.w / 2, e.y + e.h / 2, 60, 'enemy'));
                enemies.splice(i, 1);
            }
        }
    }

    // Update enemy bullets
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const b = enemyBullets[i];
        b.update();
        if (!b.active) {
            enemyBullets.splice(i, 1);
            continue;
        }

        if (player.invincible <= 0 && rectsCollide(b, player)) {
            if (player.takeHit()) {
                handlePlayerHit(state);
            }
            enemyBullets.splice(i, 1);
        }
    }

    // Update boss
    if (state.boss) {
        state.boss.update(player.x + player.w / 2);

        if (state.boss.needsBullet()) {
            const bullets = state.boss.spawnBullets();

            // Adjust aimed shot
            if (bullets.length === 1 && bullets[0].isEnemy) {
                const angle = Math.atan2(player.y - state.boss.y, player.x - (state.boss.x + state.boss.w / 2));
                bullets[0].vy = Math.sin(angle) * 5;
                bullets[0].vx = Math.cos(angle) * 5;
            }

            enemyBullets.push(...bullets);
        }

        // Boss collision with player
        if (player.invincible <= 0 && rectsCollide(player, state.boss)) {
            if (player.takeHit()) {
                handlePlayerHit(state);
            }
        }
    }

    // Boss spawn check - increases by 20 per boss kill, caps at 100
    if (!state.bossActive && state.enemiesKilledForBoss >= Math.min(20 + state.bossTypeCounter * 20, 100)) {
        state.bossActive = true;
        const bossTypes = [BOSS_TYPES.PHASE, BOSS_TYPES.ASSAULT, BOSS_TYPES.TITAN];
        const bossType = bossTypes[state.bossTypeCounter % 3];
        state.boss = new Boss(state.level, state.difficultyMult, bossType);
        particles.push(...createExplosion(CANVAS_WIDTH / 2, 300, 150));
    }

    // Spawn enemies
    state.spawnTimer++;
    if (state.spawnTimer >= state.spawnInterval && !state.bossActive) {
        state.spawnTimer = 0;
        spawnEnemy(enemies, state.difficultyMult);
    }

    // Level progression
    state.levelTimer++;
    if (state.levelTimer > 1800 && !state.bossActive) {
        state.levelTimer = 0;
        state.level++;
        state.spawnInterval = Math.max(30, 90 - state.level * 8);
    }

    // Update powerups
    for (let i = powerups.length - 1; i >= 0; i--) {
        const pu = powerups[i];
        pu.update();
        if (!pu.active) {
            powerups.splice(i, 1);
            continue;
        }

        if (rectsCollide(player, pu)) {
            playPowerUpSound();
            switch (pu.type) {
                case 'health':
                    state.lives = Math.min(state.lives + 1, 8);
                    break;
                case 'power':
                    if (player.powerLevel >= POWER_LEVELS.WIDE) {
                        player.extraPowerCollected = (player.extraPowerCollected || 0) + 1;
                        if (player.extraPowerCollected >= 2) {
                            player.bombs = Math.min((player.bombs || 0) + 1, player.maxBombs || 3);
                            player.extraPowerCollected = 0;
                        }
                    } else {
                        player.addPower();
                    }
                    break;
                case 'shield':
                    player.addShield();
                    playShieldActivateSound();
                    break;
                case 'bomb':
                    player.addBomb();
                    break;
            }
            particles.push(...createSparks(pu.x, pu.y, 10));
            powerups.splice(i, 1);
        }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx * 3;
        pt.y += pt.vy * 3;
        pt.vy += 0.15;
        pt.life -= pt.decay;
        if (pt.life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Screen shake decay
    if (state.shakeTimer > 0) state.shakeTimer--;

    // Update stars
    updateStars(state.stars, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handlePlayerHit(state) {
    state.lives--;
    if (state.lives > 4) {
        state.player.powerLevel = Math.max(state.player.powerLevel - 1, 1);
        state.player.fireRate = Math.max(5, 12 - state.player.powerLevel * 3);
    }
    state.player.invincible = 120;
    state.comboCount = 0;
    state.particles.push(...createExplosion(state.player.x + state.player.w / 2, state.player.y + state.player.h / 2, 90));
    state.shakeTimer = 15;
    state.shakeIntensity = 6;

    if (state.lives <= 0) {
        if (handleDeathRef.current) {
            handleDeathRef.current();
        }
    }
}

function spawnEnemy(enemies, difficultyMult) {
    const roll = Math.random();
    let type = 'type1';
    if (roll < 0.70) type = 'type1';
    else if (roll < 0.95) type = 'type2';
    else type = 'type3';
    enemies.push(new Enemy(type, difficultyMult));
}

function spawnPowerup(x, y, powerups) {
    const rand = Math.random();
    let type = 'health';
    if (rand < 0.35) type = 'health';
    else if (rand < 0.70) type = 'power';
    else if (rand < 0.90) type = 'shield';
    else type = 'bomb';

    powerups.push(new Powerup(x, y, type));
}

// ============================================================
//  DRAW
// ============================================================

function drawGame(ctx, state, time, canvasWidth, canvasHeight, scale = 1, frame = 0) {
    ctx.save();
    ctx.scale(scale, scale);

    // Screen shake
    if (state.shakeTimer > 0) {
        const sx = (Math.random() - 0.5) * state.shakeIntensity;
        const sy = (Math.random() - 0.5) * state.shakeIntensity;
        ctx.translate(sx, sy);
    }

    // Clear
    ctx.fillStyle = '#05050f';
    ctx.fillRect(-10, -10, CANVAS_WIDTH + 20, CANVAS_HEIGHT + 20);

    // Stars
    drawStars(ctx, state.stars, time);

    if (state.state === STATES.MENU) {
        drawMenu(ctx, state, time);
    } else if (state.state === STATES.PLAYING || state.state === STATES.PAUSED || state.state === STATES.GAMEOVER) {
        drawGameObjects(ctx, state, time, frame);
        drawHUD(ctx, state, time);

        if (state.state === STATES.PAUSED) {
            drawPauseOverlay(ctx, state);
        }

        if (state.state === STATES.GAMEOVER) {
            drawGameOver(ctx, state);
        }
    }

    ctx.restore();
}

function drawGameObjects(ctx, state, time, frame) {
    const { powerups, enemies, boss, playerBullets, enemyBullets, particles, player } = state;

    // Powerups
    for (const pu of powerups) {
        drawPowerup(ctx, pu, frame);
    }

    // Enemies
    for (const e of enemies) {
        switch (e.type) {
            case 'type1': drawEnemyType1(ctx, e.x, e.y, e.w, e.h); break;
            case 'type2': drawEnemyType2(ctx, e.x, e.y, e.w, e.h); break;
            case 'type3': drawEnemyType3(ctx, e.x, e.y, e.w, e.h, e.hp, e.maxHp); break;
        }

        // HP bar for tough enemies
        if (e.type === 'type3' && e.hp < e.maxHp) {
            ctx.fillStyle = '#333';
            ctx.fillRect(e.x, e.y - 24, e.w, 12);
            ctx.fillStyle = '#0f0';
            ctx.fillRect(e.x, e.y - 24, e.w * (e.hp / e.maxHp), 12);
        }
    }

    // Boss
    if (boss && boss.hp > 0) {
        switch (boss.type) {
            case BOSS_TYPES.PHASE:
                drawBossType1(ctx, boss.x, boss.y, boss.w, boss.h, boss.hp, boss.maxHp, boss.bodyColor, boss.armorColor, boss.coreColor);
                break;
            case BOSS_TYPES.ASSAULT:
                drawBossType2(ctx, boss.x, boss.y, boss.w, boss.h, boss.hp, boss.maxHp, boss.bodyColor, boss.armorColor, boss.coreColor);
                break;
            case BOSS_TYPES.TITAN:
                drawBossType3(ctx, boss.x, boss.y, boss.w, boss.h, boss.hp, boss.maxHp, boss.bodyColor, boss.armorColor, boss.coreColor);
                break;
        }
    }

    // Player
    if (player && state.lives > 0) {
        if (player.invincible <= 0 || Math.floor(player.invincible / 4) % 2 === 0) {
            drawPlayerShip(ctx, player.x, player.y, player.w, player.h);
        }

        // Shield
        if (player.shieldActive && player.shieldHP > 0) {
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.3 + Math.sin(time / 100) * 0.2})`;
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.arc(player.x + player.w / 2, player.y + player.h / 2, 105, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 + Math.sin(time / 80) * 0.1})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(player.x + player.w / 2, player.y + player.h / 2, 120, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // Bullets
    for (const b of playerBullets) {
        drawBullet(ctx, b);
    }
    for (const b of enemyBullets) {
        drawBullet(ctx, b);
    }

    // Particles
    drawParticles(ctx, particles);
}

function drawMenu(ctx, state, time) {
    ctx.textAlign = 'center';

    // Title glow
    const glow = Math.sin(time / 500) * 0.3 + 0.7;
    ctx.shadowColor = '#0ff';
    ctx.shadowBlur = 60 * glow;
    ctx.fillStyle = '#0ff';
    ctx.font = 'bold 180px Courier New';
    ctx.fillText('SPACE FIGHTER', CANVAS_WIDTH / 2, 540);
    ctx.shadowBlur = 0;

    // Subtitle
    ctx.fillStyle = '#888';
    ctx.font = '54px Courier New';
    ctx.fillText('A Star Destroyer Awaits...', CANVAS_WIDTH / 2, 660);

    // Start prompt
    const blink = Math.sin(time / 400) > 0;
    if (blink) {
        ctx.fillStyle = '#ff0';
        ctx.font = 'bold 66px Courier New';
        ctx.fillText('PRESS ENTER TO START', CANVAS_WIDTH / 2, 600);
    }

    // Controls
    ctx.fillStyle = '#aaa';
    ctx.font = '48px Courier New';
    const controls = [
        'WASD / ARROWS - Move Ship',
        'SPACE - Fire Weapons',
        'B - Use Bomb',
        'ESC - Pause'
    ];
    controls.forEach((line, i) => {
        ctx.fillText(line, CANVAS_WIDTH / 2, 1200 + i * 90);
    });

    // Difficulty
    ctx.fillStyle = '#f80';
    ctx.font = '42px Courier New';
    ctx.fillText(`Difficulty: ${state.difficulty.toUpperCase()}`, CANVAS_WIDTH / 2, 1590);

    // High score
    if (state.highScore > 0) {
        ctx.fillStyle = '#ff0';
        ctx.font = '48px Courier New';
        ctx.fillText(`HIGH SCORE: ${state.highScore.toString().padStart(6, '0')}`, CANVAS_WIDTH / 2, 1680);
    }

    // Decorative ships
    drawPlayerShip(ctx, CANVAS_WIDTH / 2 - 150, 780, 216, 260);
    drawEnemyType1(ctx, CANVAS_WIDTH / 2 + 150, 795, 194, 194);
}

function drawHUD(ctx, state, time) {
    const { score, highScore, lives, level, comboCount, comboTimer, player, boss } = state;

    // Score
    ctx.fillStyle = '#0ff';
    ctx.font = 'bold 54px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${score.toString().padStart(6, '0')}`, 60, 105);

    // High score
    ctx.fillStyle = '#888';
    ctx.font = '42px Courier New';
    ctx.fillText(`HIGH: ${highScore.toString().padStart(6, '0')}`, 60, 165);

    // Lives
    ctx.fillStyle = '#0ff';
    ctx.font = '42px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText('LIVES:', CANVAS_WIDTH - 540, 105);
    drawPlayerShip(ctx, CANVAS_WIDTH - 360, 56, 72, 88);
    ctx.fillStyle = '#0ff';
    ctx.font = 'bold 42px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(`x${lives}`, CANVAS_WIDTH - 250, 105);

    // Level
    ctx.fillStyle = '#ff0';
    ctx.font = 'bold 48px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(`LEVEL ${level}`, CANVAS_WIDTH / 2, 90);

    // Combo
    if (comboCount > 1) {
        ctx.fillStyle = `rgba(255, 255, 0, ${comboTimer / 120})`;
        ctx.font = `bold ${48 + Math.min(comboCount, 10) * 3}px Courier New`;
        ctx.fillText(`${Math.min(comboCount, 10)}x COMBO!`, CANVAS_WIDTH / 2, 180);
    }

    // Power level
    ctx.fillStyle = '#f80';
    ctx.font = '42px Courier New';
    ctx.textAlign = 'left';
    const powerBar = '█'.repeat(player.powerLevel) + '░'.repeat(Math.min(3, 4 - player.powerLevel));
    ctx.fillText(`POWER: ${powerBar}`, 60, 225);

    // Bombs
    if (player.bombs > 0) {
        ctx.fillStyle = '#ff0';
        ctx.font = '42px Courier New';
        ctx.fillText(`BOMBS: ${player.bombs}`, 60, 285);
    }

    // Boss HP bar
    if (boss && boss.hp > 0) {
        const barW = 900;
        const barX = CANVAS_WIDTH / 2 - barW / 2;
        const barY = CANVAS_HEIGHT - 120;
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barW, 36);
        ctx.fillStyle = `rgb(${Math.floor(255 * (1 - boss.hp / boss.maxHp))}, 100, 0)`;
        ctx.fillRect(barX, barY, barW * (boss.hp / boss.maxHp), 36);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.strokeRect(barX, barY, barW, 36);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 36px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('BOSS', CANVAS_WIDTH / 2, barY - 12);
    }
}

function drawPauseOverlay(ctx, state) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#0ff';
    ctx.font = 'bold 144px Courier New';
    ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 90);

    ctx.fillStyle = '#aaa';
    ctx.font = '54px Courier New';
    ctx.fillText('Press ESC to resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
}

function drawGameOver(ctx, state) {
    // Dim background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.textAlign = 'center';

    ctx.shadowColor = '#f00';
    ctx.shadowBlur = 60;
    ctx.fillStyle = '#f44';
    ctx.font = 'bold 168px Courier New';
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 600);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 84px Courier New';
    ctx.fillText(`FINAL SCORE: ${state.score.toString().padStart(6, '0')}`, CANVAS_WIDTH / 2, 840);

    ctx.fillStyle = '#ff0';
    ctx.font = '60px Courier New';
    ctx.fillText(`LEVEL REACHED: ${state.level}`, CANVAS_WIDTH / 2, 960);

    if (state.showNewHighScore) {
        ctx.fillStyle = '#f0f';
        ctx.font = 'bold 66px Courier New';
        ctx.fillText('★ NEW HIGH SCORE! ★', CANVAS_WIDTH / 2, 1080);
    }

    const blink = Math.sin(Date.now() / 400) > 0;
    if (blink) {
        ctx.fillStyle = '#0ff';
        ctx.font = 'bold 66px Courier New';
        ctx.fillText('PRESS ENTER TO PLAY AGAIN', CANVAS_WIDTH / 2, 1320);
    }
}

// ============================================================
//  UTILITIES
// ============================================================

function generateStars() {
    const stars = [];
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: Math.random() * CANVAS_WIDTH,
            y: Math.random() * CANVAS_HEIGHT,
            size: Math.random() * 4 + 1.5,
            speed: Math.random() * 3 + 0.5,
            brightness: Math.random() * 0.5 + 0.5
        });
    }
    return stars;
}
