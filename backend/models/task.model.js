import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'New Task'
    },
    description: {
        type: String,
        required: true,
        default: 'New Task'
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;