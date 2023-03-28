const { Schema, model } = require('mongoose');

// subdocument to thoughtSchema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    }
});

// Thought Schema
const thoughtSchema = new Schema({
    thoughtText: { 
        type: String,
        required: true,
        minLength: 1,
        maxLength: 128 
    },
    createdAt: { 
        type: Date, 
        default: () => Date.now(),

    },
    username: { 
        type: String, 
        required: true 
    },
    reactions: [reactionSchema]
    },
    {
        toJson: {
            virtuals: true
        },
        id: false
    }
);

// virtual that grabs the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;