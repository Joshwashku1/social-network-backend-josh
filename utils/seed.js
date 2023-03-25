const connection = require('../config/connection');
const { User, Thought } = require('../models');

// const thoughtData1 = []
// User.create([
//     { username: 'josh', email: 'josh@gmail.com'}
// ])

connection.once('open', async () => {

    // delete to run the seed again
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [
        {
            username: 'josh',
            email: 'josh@gmail.com'
        },
    ];

    const thoughts = [
        {
            thoughtText: 'making an app using mongo',
            username: 'josh',
            reactions: [
                {
                    reactionBody: 'mongo can be confusing',
                    username: 'josh'
                },
            ],
        }
    ];

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    process.exit(0);
});