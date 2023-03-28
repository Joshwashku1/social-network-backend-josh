const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            // .populate('thought')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    }, 
    getSingleUser(req,res){
        User.findOne({ _id: req.params.userId})
            // .select('-__v')
            // .populate('thoughts')
            // .populate('friends')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user with that Id" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    // Create a user
    createUser(req,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Add a friend to user
    addFriend(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: req.params.friendsId }},
            { validators: true, new: true }
        )
            .then((user) => {
              console.log(user)
              !user 
                ? res   
                    .status(404)
                    .json({ message: 'No users found with that ID'})
                : res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set : { username: req.body.username, email: req.body.email }},
            { validators: true, new: true }
        )
        .then((user) => 
            !user
                ? res
                    .status(404)
                    .json({ message: 'No users found by Id' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};