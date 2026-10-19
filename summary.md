# Space Fighter - Game Mechanics Summary

## Core Game Loop
- **Objective**: Survive waves of enemies and defeat bosses to score points
- **Controls**: WASD/Arrow keys to move, auto-fire enabled
- **Scoring**: Points awarded per enemy defeated, combo system rewards consecutive kills

## Player
- **Movement**: WASD/Arrow keys, clamped to canvas bounds
- **Shooting**: Automatic fire, rate increases with power-ups
- **Lives**: Starts with 3, max 5, power-up drops can restore
- **Power-ups**: Health (+), Power (P), Shield (S), Bomb (B)
- **Bomb**: Press B to destroy all enemies on screen and damage boss (max 3 charges)

## Enemy Types

| Type | Rarity | HP | Speed | Points | Fire Rate |
|------|--------|----|-------|--------|-----------|
| type1 | Common (70%) | 15 | 0.8 | 15 | 40 frames (every ~0.67s) |
| type2 | Uncommon (25%) | 30 | 1.0 | 30 | 30 frames (every ~0.5s) |
| type3 | Rare (5%) | 100 | 0.5 | 50 | 20 frames (every ~0.33s) |

- **Movement Patterns**: 80% sine wave, 20% straight down
- **Fire Behavior**: Enemies fire when off-screen and cooldown expires

## Boss
- **Spawn Condition**: Appears after killing 20 enemies
- **HP**: `(500 + level * 200) * difficultyMultiplier`
- **Behavior**: Enters from top, then cycles through 3 phases (sway, chase, erratic)
- **Attack Patterns**: Spread shot, aimed shot, side shots
- **Victory**: Clears all enemies, increments level, resets spawn counter

## Difficulty Modifiers

| Mode | HP | Speed | Fire Rate | Spawn Rate |
|------|----|-------|-----------|------------|
| Easy | 70% | 80% | 130% | 120% |
| Normal | 100% | 100% | 100% | 100% |
| Hard | 150% | 120% | 70% | 80% |

## Level Progression
- **Duration**: 1800 frames (~30 seconds)
- **Spawn Interval**: Starts at 90 frames, decreases by 8 per level (min 30)
- **Boss Requirement**: 20 kills required before boss spawns

## Objectives

### Priority: Background Music (BGM) Working
- Replace placeholder audio paths with actual MP3 files served by Vite from `public/`
- Ensure `startBgm()` is called at the right time in the game lifecycle (on ENTER keypress for menu/start)
- Fix `gameState` ref issue: `useEffect` dependencies on `gameState.state` never fire because refs don't trigger React re-renders
- Verify audio files are accessible at `http://localhost:5173/bgm1.mp3` etc.

## Changes Made

### Change 1: Rarity-Based Enemy Spawn Rates (2026)
**Before**: type1 (50%), type2 (35%), type3 (15%)
**After**: type1 (70%), type2 (25%), type3 (5%)
**File**: `client/src/components/Game.jsx:475-482`
**Reason**: Rare enemies (type3) were appearing too frequently, reducing strategic value

### Change 2: Enemy Fire Rate Reduced by 2/3 (2026)
**Before**: type1 (120f), type2 (90f), type3 (60f)
**After**: type1 (40f), type2 (30f), type3 (20f)
**File**: `client/src/game/entities.js:188`
**Reason**: Screen was filling with enemy bullets, reducing player reaction time

### Change 3: BGM Path Fix (2026)
**Before**: `BGM_TRACKS` in `client/src/game/audio.js` used relative paths (`bgm1.mp3`)
**After**: Paths use leading slash (`/bgm1.mp3`) per Vite public asset convention
**File**: `client/src/game/audio.js`
**Reason**: Vite serves static files from `public/` at root URL path

### Change 4: BGM Trigger Points Centralized (2026)
**Before**: `startBgm('ambient')` called inconsistently; broken `useEffect` on `gameState.state` relied on stale ref
**After**: `startBgm()` called directly in `startGame()` (line 84), `resetGame()` (line 112), boss spawn (line 407), boss death (line 317)
**File**: `client/src/components/Game.jsx`
**Reason**: `gameState` is a `useRef`, so `useEffect(..., [gameState.state])` never fires; manual calls in user-interaction callbacks ensure audio plays after user gesture (required by browser autoplay policy)

### Change 5: Removed Broken useEffect for BGM (2026)
**Before**: `useEffect(() => { if (gameState.state === PLAYING) startBgm(); ... }, [gameState.state])` at line 191
**After**: Removed entirely
**File**: `client/src/components/Game.jsx`
**Reason**: `gameState` is a ref; changes to `gameState.state` do not trigger React re-renders, so the effect dependency array never detects changes and the effect never runs

## Known Issues
- BGM silence may persist in browser due to autoplay policy; user must press ENTER to start game
- Boss spawn mechanism not yet fixed (requires user input on specific problem)
- Screen fills with entities during late game (mitigated by fire rate reduction)
