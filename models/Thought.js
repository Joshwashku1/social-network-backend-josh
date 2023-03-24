const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: { 
        type: String,
        required: true },
    createdAt: { type: Date, default: () => Date.now()},
    username: { type: String, required: true },
    reactions: [
        {}
    ]

});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;