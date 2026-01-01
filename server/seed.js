import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Student from './models/Student.js';
import Section from './models/Section.js';
import Result from './models/Result.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // Read db.json using absolute path derived from process.cwd() or relative to this script
        const dbPath = path.join(__dirname, '../db.json');
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

        // Clear existing data? Maybe ask user? For now, let's assume valid fresh or just appending.
        // Actually, "make all changes goes to mongodb" implies migration.
        // Let's clear to avoid dupes if run multiple times.
        await User.deleteMany();
        await Student.deleteMany();
        await Section.deleteMany();
        await Result.deleteMany();

        // Prepare data
        // Users
        // Need to remove 'id' as Mongo handles it, or map it.
        const users = data.users
            .filter(u => u.username && u.password && u.name) // Filter invalid users
            .map(u => ({
                username: u.username,
                password: u.password,
                name: u.name,
                email: u.email || 'test@example.com' // Handle missing email
            }));

        const students = data.students.map(s => {
            const { id, ...rest } = s;
            return rest;
        });

        const sections = data.sections.map(s => {
            const { id, ...rest } = s;
            return rest;
        });

        const results = data.results.map(r => {
            const { id, ...rest } = r;
            return rest;
        });

        await User.insertMany(users);
        await Student.insertMany(students);
        await Section.insertMany(sections);
        await Result.insertMany(results);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
