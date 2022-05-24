const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const { createComment } = require('../Controllers/commentController');

router.route('/comment/create').post(isLoggedIn, createComment);

module.exports = router;
