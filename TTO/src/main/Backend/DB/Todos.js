import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Todo', TodoSchema); 