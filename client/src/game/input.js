import { KEYS } from './constants.js';

const state = new Map();

export function initInput() {
    state.clear();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
}

export function destroyInput() {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mouseup', handleMouseUp);
    state.clear();
}

function handleKeyDown(e) {
    state.set(e.code, true);
    if (e.code === 'Space') e.preventDefault();
}

function handleKeyUp(e) {
    state.set(e.code, false);
}

function handleMouseDown(e) {
    state.set('MouseLeft', true);
}

function handleMouseUp(e) {
    state.set('MouseLeft', false);
}

export function isPressed(key) {
    return state.get(key) || false;
}

export function hasAny(keys) {
    return keys.some(k => state.get(k));
}

export function wasPressed(key) {
    const pressed = state.get(key);
    return pressed;
}

export function clearKey(key) {
    state.set(key, false);
}

// Directional input (normalized)
export function getDirection() {
    let dx = 0;
    let dy = 0;

    const horizontal = [KEYS.KEY_A, KEYS.ARROW_LEFT, KEYS.KEY_J];
    const vertical = [KEYS.KEY_W, KEYS.ARROW_UP, KEYS.KEY_I];
    const horizontalRight = [KEYS.KEY_D, KEYS.ARROW_RIGHT, KEYS.KEY_L];
    const verticalDown = [KEYS.KEY_S, KEYS.ARROW_DOWN, KEYS.KEY_K];

    if (hasAny(horizontal)) dx = -1;
    if (hasAny(horizontalRight)) dx = 1;
    if (hasAny(vertical)) dy = -1;
    if (hasAny(verticalDown)) dy = 1;

    // Normalize diagonal
    if (dx !== 0 && dy !== 0) {
        const inv = 0.707;
        dx *= inv;
        dy *= inv;
    }

    return { dx, dy };
}
