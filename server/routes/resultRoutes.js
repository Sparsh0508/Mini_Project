import express from 'express';
import Result from '../models/Result.js';

const router = express.Router();

// GET /results
router.get('/', async (req, res) => {
    try {
        const results = await Result.find();
        res.json(results.map(r => ({ ...r.toObject(), id: r._id })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /results
router.post('/', async (req, res) => {
    try {
        const result = await Result.create(req.body);
        res.status(201).json({ ...result.toObject(), id: result._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /results/:id
router.put('/:id', async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ ...result.toObject(), id: result._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /results/:id
router.delete('/:id', async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.json({ message: 'Result removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
