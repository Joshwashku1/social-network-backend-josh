const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        trim: true,
        unique: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        match: ["*@gmail.com"]
     },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
});

const User = model('user', userSchema);

module.exports = User;