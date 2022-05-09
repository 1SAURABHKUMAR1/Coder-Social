/*
    FLOW ->
    generate access and refresh token
    send refresh token in cookie and access token in json
    store access token in cookkie and refresh token in cookie
    send access to verify protected routes
    if acess token expires send request with refresh token to ask access token
*/

const cookieToken = (user, res) => {
    const jwtRefreshToken = user.getRefreshToken();
    const jwtAccessToken = user.getAccessToken();

    // cookie
    const RefreshOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE_DAY * 24 * 60 * 60 * 1000,
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
        .json({
            success: true,
            user,
        });
};

module.exports = cookieToken;
