import { Router } from 'express';
import { getScores, addScore } from '../db.js';

const router = Router();

/**
 * GET /api/scores
 * Returns top high scores
 * Query params: limit (default 10)
 */
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const scores = await getScores(limit);
        res.json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Failed to fetch scores' });
    }
});

/**
 * POST /api/scores
 * Submit a new high score
 * Body: { score, level }
 */
router.post('/', async (req, res) => {
    try {
        const { score, level } = req.body;

        if (typeof score !== 'number' || score < 0) {
            return res.status(400).json({ error: 'Invalid score' });
        }

        const result = await addScore(score, level);
        res.json(result);
    } catch (error) {
        console.error('Error submitting score:', error);
        res.status(500).json({ error: 'Failed to submit score' });
    }
});

export default router;
