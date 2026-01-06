const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON data

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mernappuser:StrongPassword123!@cluster0.yqqxmb2.mongodb.net/comments_db')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Error:', err));

// Comment Schema (Database structure)
const commentSchema = new mongoose.Schema({
    username: String,
    remarks: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

//  ROUTES (API Endpoints)

// 1. GET all comments
app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. POST a new comment
app.post('/api/comments', async (req, res) => {
    try {
        const { username, remarks, rating } = req.body;
        
        // Validate
        if (!username || !remarks || !rating) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newComment = new Comment({
            username,
            remarks,
            rating
        });
        
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. DELETE a comment
app.delete('/api/comments/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` API available at: http://localhost:${PORT}/api/comments`);
});