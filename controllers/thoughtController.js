const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought by Id
    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought matched!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req,res) {
        Thought.create(req.body)
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    updateThoughtText(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: { thoughtText: req.body.thoughtText }},
            { validators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found by that ID'})
                : res.json(thought)    

        )
        .catch((err) => res.status(500).json(err));
    },
    createReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { validators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found by Id' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};