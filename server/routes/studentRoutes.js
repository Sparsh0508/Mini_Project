import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// GET /students - Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students.map(s => ({ ...s.toObject(), id: s._id })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /students - Create new student
router.post('/', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({ ...student.toObject(), id: student._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /students/:id - Update student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ ...student.toObject(), id: student._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /students/:id - Delete student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
