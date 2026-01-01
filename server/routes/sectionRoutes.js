import express from 'express';
import Section from '../models/Section.js';

const router = express.Router();

// GET /sections
router.get('/', async (req, res) => {
    try {
        const sections = await Section.find();
        res.json(sections.map(s => ({ ...s.toObject(), id: s._id })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /sections
router.post('/', async (req, res) => {
    try {
        const section = await Section.create(req.body);
        res.status(201).json({ ...section.toObject(), id: section._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /sections/:id
router.put('/:id', async (req, res) => {
    try {
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ ...section.toObject(), id: section._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /sections/:id
router.delete('/:id', async (req, res) => {
    try {
        await Section.findByIdAndDelete(req.params.id);
        res.json({ message: 'Section removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
