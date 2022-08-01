const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    job: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    role: { type: String, required: true }, 
    avatar: { type: String, required: true }
}); 

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 