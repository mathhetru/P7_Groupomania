const mongoose = require('mongoose'); 

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false }, 
    likes: { type: Number, default: 0, required: true },
    usersLiked: { type : Array , "default" : [], required: true },
    commentNumber: { type: Number, default: 0, required: true },
    comments: {  type : Array , "default" : [], required:  true }
}); 

module.exports = mongoose.model('Post', postSchema); 