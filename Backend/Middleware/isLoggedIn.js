const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

// search for token in cookie -> search for token in header validate token and add it to req.user
exports.isLoggedIn = BigPromise(async (req, res, next) => {
    let accessToken = req.cookies?.access;

    if (!accessToken && req.header('Authorization')) {
        accessToken = req.header('Authorization').replace('Bearer ', '');
    }

    if (accessToken === undefined) {
        return CustomError(res, 'Login to procced', 401);
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);

    if (!decoded) {
        return CustomError(res, 'Login to procced', 401);
    }

    const user = await User.findOne({ user_id: decoded.user_id });

    if (!user) {
        return CustomError(res, 'User not found', 401);
    }

    req.user = user;

    next();
});
