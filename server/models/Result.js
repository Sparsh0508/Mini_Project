import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    marks: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    examdate: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Result', resultSchema);
