const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
} = require('../Controllers/postController');

router.route('/post/create').post(isLoggedIn, createPost);
router.route('/post').get(getAllPosts);
router.route('/post/:postId').get(getSinglePost).delete(isLoggedIn, deletePost);

module.exports = router;
