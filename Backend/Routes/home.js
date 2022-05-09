const router = require('express').Router();

const { homeWelcome } = require('../Controllers/homeController');

router.route('/').get(homeWelcome);

module.exports = router;
