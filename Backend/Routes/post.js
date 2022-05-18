const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const {
    createPost,
    getAllPosts,
    getSinglePost,
} = require('../Controllers/postController');

router.route('/post/create').post(isLoggedIn, createPost);
router.route('/post').get(getAllPosts);
// TODO:
router.route('/post/:postId').get(getSinglePost);

module.exports = router;
