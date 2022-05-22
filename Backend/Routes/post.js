const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    updatePost,
    likeUnlikePost,
    unicronUnunicornPost,
    bookmarkUnBookmarkPost,
} = require('../Controllers/postController');

router.route('/post/create').post(isLoggedIn, createPost);
router.route('/post').get(getAllPosts);
router
    .route('/post/:postId')
    .get(getSinglePost)
    .delete(isLoggedIn, deletePost)
    .put(isLoggedIn, updatePost);

router.route('/post/:postId/like').put(isLoggedIn, likeUnlikePost);
router.route('/post/:postId/unicorn').put(isLoggedIn, unicronUnunicornPost);
router.route('/post/:postId/bookmark').put(isLoggedIn, bookmarkUnBookmarkPost);

module.exports = router;
