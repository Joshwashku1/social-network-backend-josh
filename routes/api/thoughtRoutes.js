const router = require('express').Router();




// /api/thoughts
router.route('/');

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions');

module.exports = router;