const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const {
    getAllTags,
    getSingleTag,
    followUnfollowTag,
} = require('../Controllers/tagController');

router.route('/tags').get(getAllTags);
router.route('/tag/:tagName').get(getSingleTag);
router.route('/tag/follow/:tagId').put(isLoggedIn, followUnfollowTag);

module.exports = router;
