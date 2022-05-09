const User = require('../Models/User');
const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const validator = require('validator');
const cookieToken = require('../utils/CookieToken');
const cloudinary = require('cloudinary').v2;
const emailSender = require('../utils/EmailSender');
const crypto = require('crypto');
const verifyRefreshToken = require('../Middleware/verifyRefreshToken');
const passport = require('passport-google-oauth20');

// signup
exports.signup = BigPromise(async (req, res, next) => {
    const { name, email, password, photo } = req.body;

    if (!(name && email && password && photo)) {
        return next(CustomError(res, 'All Fields are required', 401));
    }

    if (!validator.isDataURI(photo)) {
        return next(CustomError(res, 'Profile Photo is required', 401));
    }

    if (!validator.isEmail(email)) {
        return next(CustomError(res, 'Provide a valid email', 401));
    }

    const userDB = await User.findOne({ email: email });

    if (userDB) {
        return next(CustomError(res, 'Email already exists', 401));
    }

    const cloudinaryPhoto = await cloudinary.uploader.upload(photo, {
        folder: 'codersocial',
        width: 250,
        crop: 'fit',
    });

    const username = `${email.substring(0, email.lastIndexOf('@'))}${Math.floor(
        Math.random() * 9999 + 1000,
    )}`;

    const user = await User.create({
        name: name,
        email: email,
        username: username,
        password: password,
        profile_photo: {
            id: cloudinaryPhoto.public_id,
            secure_url: cloudinaryPhoto.secure_url,
        },
    });

    cookieToken(user, res);
});

// login
exports.login = BigPromise(async (req, res, next) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return next(CustomError(res, 'All Fields are required!', 401));
    }

    if (!validator.isEmail(email)) {
        return next(CustomError(res, 'Email is invalid', 401));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(CustomError(res, 'Email or Password is Invalid', 401));
    }

    const validPassword = await user.isPasswordValid(password);

    if (!validPassword) {
        return next(CustomError(res, 'Email or Password is Invalid', 403));
    }

    cookieToken(user, res);
});

// logout
exports.logout = BigPromise(async (req, res, next) => {
    res.status(200)
        .cookie('refresh', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .cookie('access', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .json({
            success: true,
            message: 'Logout Successfull',
        });
});

// forgot password token
exports.forgotPassword = BigPromise(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(CustomError(res, 'All Fields are mandatory', 401));
    }
    if (!validator.isEmail(email)) {
        return next(CustomError(res, 'All Fields are mandatory', 401));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(CustomError(res, 'Email is not registered', 401));
    }

    const forgotPasswordToken = await user.getForgotPasswordToken();

    await user.save({ validateBeforeSave: false });

    const tokenResetUrl = `${req.protocol}://${req.get(
        'host',
    )}/host/api/v1/password/reset/${forgotPasswordToken}`;

    const message = `Paste the link in browser to reset password ${tokenResetUrl}`;

    try {
        await emailSender({
            toemail: email,
            subject: 'Coder Social :- Forgot Password',
            message,
        });

        res.status(200).json({
            success: true,
            message: 'Email Sent Successfull',
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });

        console.log(error.message);
        return next(CustomError(res, 'Email Send Failed', 203));
    }
});

// reset user password -> get token from params -> hash it again -> find user via token and date -> if token is invalid or date is below flush both if all welll and good reset password
exports.resetPassword = BigPromise(async (req, res, next) => {
    const { token } = req.params;

    if (!token) {
        return next(CustomError(res, 'Invalid Reset Link', 403));
    }

    const finalToken = await crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken: finalToken,
        forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
        return next(CustomError(res, 'Token is invalid or expired', 403));
    }

    const { password, confirmPassword } = req.body;

    if (password != confirmPassword) {
        return next(CustomError(res, 'Password Doesnot match', 401));
    }

    user.password = password;

    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Password Reset Successfull',
    });
});

// get logged in user details
exports.LoggedInUserDetails = BigPromise(async (req, res, next) => {
    const { user_id } = req.user;

    const user = await User.findOne({ user_id });

    if (!user) {
        return next(CustomError(res, 'User doesnot exists', 401));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update password
exports.updatePassword = BigPromise(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
        return next(CustomError(res, 'All Fields are required', 401));
    }

    const { user_id } = req.user;

    const user = await User.findOne({ user_id }).select('+password');

    const validPassword = await user.isPasswordValid(oldPassword);

    if (!validPassword) {
        return next(CustomError(res, 'Password is invalid', 401));
    }

    user.password = newPassword;

    await user.save();

    cookieToken(user, res);
});

//update profile
exports.updateProfile = BigPromise(async (req, res, next) => {
    const { name, email, username, password, photo } = req.body;
    const { user_id, profile_photo } = req.user;

    if (!(name && email && username && password)) {
        return next(CustomError(res, 'Name and Email is mandatory', 401));
    }

    if (!validator.isEmail(email)) {
        return next(CustomError(res, 'Email is not valid', 401));
    }

    const userDB = await User.findOne({ user_id }).select('+password');

    const validPassword = await userDB.isPasswordValid(password);

    if (!validPassword) {
        return next(CustomError(res, 'Password is invalid', 401));
    }

    const newData = {
        name,
        email,
        username,
        bio: req.body?.bio,
        portfolio_link: req.body?.portfolio_link,
        work: req.body?.work,
        skills: req.body?.skills,
    };

    if (photo) {
        if (!validator.isDataURI(photo)) {
            return next(CustomError(res, 'Profile Photo is required', 401));
        }

        await cloudinary.uploader.destroy(profile_photo.id);

        const cloudinaryPhoto = await cloudinary.uploader.upload(photo, {
            folder: 'codersocial',
            width: 250,
            crop: 'fit',
        });

        newData.profile_photo = {
            id: cloudinaryPhoto.public_id,
            secure_url: cloudinaryPhoto.secure_url,
        };
    }

    const user = await User.findOneAndUpdate(user_id, newData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: 'Profile Update Success',
        user,
    });
});

// user selete account
exports.profileDelete = BigPromise(async (req, res, next) => {
    const { user_id } = req.user;

    const user = await User.findOne({ user_id });

    await cloudinary.uploader.destroy(user.profile_photo.id);

    await user.remove();

    res.status(200)
        .cookie('refresh', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .cookie('access', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: 'Logout Successfull',
        });
});

// admin single user
exports.adminSingleUser = BigPromise(async (req, res, next) => {
    const { userid } = req.params;

    if (!userid) {
        return next(CustomError(res, 'All Fields are required', 401));
    }

    const user = await User.findOne({ user_id: userid });

    if (!user) {
        return next(CustomError(res, 'User doesnot exists', 401));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// admin delete single user
exports.adminDeleteUser = BigPromise(async (req, res, next) => {
    const { userid } = req.params;

    if (!userid) {
        return next(CustomError(res, 'All Fields are required!', 401));
    }

    const user = await User.findOne({ user_id: userid });

    if (!user) {
        return next(CustomError(res, 'User doesnot exists', 401));
    }

    await cloudinary.uploader.destroy(user.profile_photo.id);

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'User deleted Successfull',
    });
});

//  get refressh token
exports.getAccessToken = BigPromise(async (req, res, next) => {
    const { refresh } = req.cookies;

    // get refresh token
    if (!refresh) {
        return next(CustomError(res, 'You are not authorized', 401));
    }

    // check refresh token
    const isValidRefresh = verifyRefreshToken(refresh);

    if (!isValidRefresh) {
        return next(CustomError(res, 'Token expired ! Login Again', 401));
    }

    //  check for user present
    const user = await User.findOne({ user_id: isValidRefresh.user_id });

    if (!user) {
        return next(CustomError(res, 'You are not authorized', 401));
    }

    // send token
    const jwtAccessToken = user.getAccessToken();

    const AccessOptions = {
        expires: new Date(
            Date.now() + process.env.ACCESS_COOKIE_EXPIRE_DAY * 60 * 1000,
        ),
        httpOnly: true,
    };

    user.password = undefined;

    return res
        .status(200)
        .cookie('access', jwtAccessToken, AccessOptions)
        .json({
            success: true,
            user,
        });
});
