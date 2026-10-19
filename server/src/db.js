import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', '..', 'data');
const SCORES_FILE = join(DATA_DIR, 'scores.json');

/**
 * Simple JSON-file based storage for high scores.
 * In production, replace with a proper database (PostgreSQL, MongoDB, etc.)
 */

function readScores() {
    if (!existsSync(SCORES_FILE)) {
        return [];
    }
    try {
        const data = readFileSync(SCORES_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeScores(scores) {
    if (!existsSync(DATA_DIR)) {
        mkdirSync(DATA_DIR, { recursive: true });
    }
    writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
}

export async function getScores(limit = 10) {
    const scores = readScores();
    return scores.slice(0, limit);
}

export async function addScore(score, level = 1) {
    const scores = readScores();
    const newScore = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        score,
        level,
        createdAt: new Date().toISOString()
    };
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);
    writeScores(scores);
    return newScore;
}

// Initialize empty scores file if it doesn't exist
if (!existsSync(SCORES_FILE)) {
    writeScores([]);
}
