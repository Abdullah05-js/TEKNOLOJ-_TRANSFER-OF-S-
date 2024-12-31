import Todo from '../DB/Todos.js';
import mongoose from 'mongoose';

// Helper function to clean the todo object
const cleanTodoForIPC = (todo) => {
    if (!todo) return null;
    const cleanedTodo = todo.toObject();
    return {
        ...cleanedTodo,
        _id: cleanedTodo._id.toString(),
        userId: cleanedTodo.userId?._id ? {
            _id: cleanedTodo.userId._id.toString(),
            UserName: cleanedTodo.userId.UserName
        } : cleanedTodo.userId
    };
};

export const CreateTodo = async (todoData) => {
    try {
        const todo = new Todo({
            description: todoData.description,
            deadline: todoData.deadline,
            userId: new mongoose.Types.ObjectId(todoData.userId),
            completed: false
        });
        
        const savedTodo = await todo.save();
        const populatedTodo = await savedTodo.populate('userId', 'UserName');
        
        return cleanTodoForIPC(populatedTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
};

export const GetUserTodos = async () => {
    try {
        const todos = await Todo.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'UserName');
        
        return todos.map(cleanTodoForIPC);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export const UpdateTodoStatus = async (todoId, completed) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            todoId,
            { completed },
            { new: true }
        ).populate('userId', 'UserName');
        
        return cleanTodoForIPC(todo);
    } catch (error) {
        console.error('Error updating todo status:', error);
        return null;
    }
};

export const DeleteTodo = async (todoId) => {
    try {
        // Convert string ID to ObjectId if it's not already
        const objectId = typeof todoId === 'string' ? new mongoose.Types.ObjectId(todoId) : todoId;
        const result = await Todo.findByIdAndDelete(objectId);
        return !!result; // Convert to boolean
    } catch (error) {
        console.error('Error deleting todo:', error);
        return false;
    }
}; 