const router = require('express').Router();

const { isLoggedIn } = require('../Middleware/isLoggedIn');
const { customRole } = require('../Middleware/CustomRole');

const {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    LoggedInUserDetails,
    updatePassword,
    adminSingleUser,
    adminDeleteUser,
    profileDelete,
    updateProfile,
    getAccessToken,
    singleUserViaId,
    readingList,
} = require('../Controllers/userController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/user/profile').get(isLoggedIn, LoggedInUserDetails);
router.route('/profile/:username').get(singleUserViaId);
router.route('/password/update').post(isLoggedIn, updatePassword);
router.route('/profile/update').post(isLoggedIn, updateProfile);
router.route('/profile/delete').delete(isLoggedIn, profileDelete);

router.route('/user/readinglist').get(isLoggedIn, readingList);

router.route('/refresh').get(getAccessToken);

router
    .route('/admin/user/:userid')
    .get(isLoggedIn, customRole('admin'), adminSingleUser)
    .delete(isLoggedIn, customRole('admin'), adminDeleteUser);

module.exports = router;
