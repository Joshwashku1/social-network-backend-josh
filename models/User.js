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
    //    match: ["*@gmail.com"]
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
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false
    }
);

// virtual for counting number of user objects in friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;