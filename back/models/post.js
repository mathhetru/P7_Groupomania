const mongoose = require('mongoose'); 

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false }, 
    like: { type: Number, required: true }
    // comment: { type: String, required: false }
}); 

module.exports = mongoose.model('Post', postSchema); 