const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThoughtText,
    createReaction
} = require('../../controllers/thoughtController');



// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThoughtText)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

module.exports = router;