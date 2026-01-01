import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password, name, email } = req.body;

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = await User.create({
            username,
            password, // In production, hash this!
            name,
            email,
        });

        if (user) {
            res.status(201).json({
                username: user.username,
                name: user.name,
                email: user.email,
                id: user._id, // Send _id as id
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (user) {
            res.json({
                username: user.username,
                name: user.name,
                email: user.email,
                id: user._id,
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
