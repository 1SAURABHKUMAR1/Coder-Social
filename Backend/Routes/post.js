const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const { createPost } = require('../Controllers/postController');

router.route('/post/create').post(isLoggedIn, createPost);

module.exports = router;
