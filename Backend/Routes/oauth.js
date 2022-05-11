const router = require('express').Router();
const passport = require('passport');

const { googleOauth } = require('../Controllers/OauthController');

router.route('/auth/google').get(
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);
router
    .route('/auth/google/callback')
    .get(passport.authenticate('google'), googleOauth);

module.exports = router;
