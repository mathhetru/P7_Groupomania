const mongoose = require('mongoose'); 

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false }, 
    likes: { type: Number, required: true },
    usersLiked: [{ type: String, required: true }],
    commentNumber: { type: Number, required: true },
    comment: { type: String, required: false },
    usersCommented: [{ type: String, required: true }]
}); 

module.exports = mongoose.model('Post', postSchema); 