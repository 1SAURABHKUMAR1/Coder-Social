const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');

const {
    getAllNotifications,
    getUnreadNotifications,
} = require('../Controllers/notifcationController');

router.route('/notification').get(isLoggedIn, getAllNotifications);
router.route('/notification/unread').get(isLoggedIn, getUnreadNotifications);

module.exports = router;
