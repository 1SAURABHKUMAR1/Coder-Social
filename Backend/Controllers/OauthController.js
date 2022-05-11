const User = require('../Models/User');
const BigPromise = require('../Middleware/bigPromise');

exports.googleOauth = BigPromise(async (req, res) => {
    if (req.user) {
        const user = await User.findOne({ user_id: req.user.user_id });
        const jwtRefreshToken = user.getRefreshToken();
        const jwtAccessToken = user.getAccessToken();

        // cookie
        const RefreshOptions = {
            expires: new Date(
                Date.now() +
                    process.env.COOKIE_EXPIRE_DAY * 24 * 60 * 60 * 1000,
            ),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        };
        const AccessOptions = {
            expires: new Date(
                Date.now() + process.env.ACCESS_COOKIE_EXPIRE_DAY * 60 * 1000,
            ),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        };

        user.password = undefined;

        return res
            .status(200)
            .cookie('refresh', jwtRefreshToken, RefreshOptions)
            .cookie('access', jwtAccessToken, AccessOptions)
            .redirect(process.env.CLIENT_URL);
    }

    return res.redirect(process.env.CLIENT_URL);
});
