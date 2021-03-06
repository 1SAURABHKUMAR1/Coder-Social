const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const {
    createComment,
    updateComment,
    deleteComment,
    likeUnlikeComment,
} = require('../Controllers/commentController');

router.route('/comment/create').post(isLoggedIn, createComment);
router.route('/comment/edit').post(isLoggedIn, updateComment);
router.route('/comment/:commentId/like').put(isLoggedIn, likeUnlikeComment);
router.route('/comment/:commentId').delete(isLoggedIn, deleteComment);

module.exports = router;
