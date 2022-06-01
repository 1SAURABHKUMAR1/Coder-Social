const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid').v4;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [40],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        validate: [validator.isEmail, 'Email is not valid'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        maxlength: [40],
    },
    password: {
        type: String,
        minlength: [6, 'Password should be a minimum length of 6'],
        select: false,
        required: [true],
    },
    user_id: {
        type: String,
        default: uuid,
        unique: true,
    },
    social_id: {
        type: String,
        // unique: true,
        // default: '',
    },
    profile_photo: {
        id: {
            type: String,
            required: [true, 'Photo id is required'],
            deafult: 'avatar_cg3jlh',
        },
        secure_url: {
            type: String,
            required: [true, , 'Profile photo secure url is required'],
            default:
                'https://res.cloudinary.com/dz5uflnzm/image/upload/v1651848704/codersocial/avatar_cg3jlh.jpg',
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    bio: {
        type: String,
        maxlength: [100],
    },
    portfolio_link: {
        type: String,
    },
    work: {
        type: String,
    },
    skills: {
        type: String,
    },
    education: {
        type: String,
    },
    location: {
        type: String,
    },
    githubUrl: {
        type: String,
    },
    twitterUrl: {
        type: String,
    },
    total_followers: {
        type: Number,
        default: 0,
    },
    total_following: {
        type: Number,
        default: 0,
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User id is required'],
            unique: true,
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'Follower User id is required'],
            unique: true,
        },
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            required: [true, 'Post id is required in bookmarks'],
            unique: true,
        },
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            required: [true, 'Post id is required'],
            unique: true,
        },
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag',
            required: [true, 'Tag id is required'],
            unique: true,
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
            required: [true, 'Comment id is required'],
            unique: true,
        },
    ],
    forgotPasswordToken: {
        type: String,
        unique: true,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//HOOKS - encrypt password before saving
userSchema.pre('save', async function (next) {
    // not modified
    if (!this.isModified('password')) {
        return next();
    }

    // modified
    this.password = await bcrypt.hash(this.password, 10);
});

// METHODS - validate password
userSchema.methods.isPasswordValid = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

// METHODS - create and return a  refresh JWT token
userSchema.methods.getRefreshToken = function () {
    return jwt.sign({ user_id: this.user_id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRY,
    });
};

//  METHOD = create and return a access token
userSchema.methods.getAccessToken = function () {
    return jwt.sign({ user_id: this.user_id }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: process.env.JWT_ACCESS_EXPIRY,
    });
};

// METHODS - create and store forgot password
//  for more security generate a token sent to user and hash the token sent and store
userSchema.methods.getForgotPasswordToken = async function () {
    const forgotToken = await crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = await crypto
        .createHash('sha256')
        .update(forgotToken)
        .digest('hex');

    this.forgotPasswordExpiry =
        Date.now() + process.env.FORGOT_PASSWORD_EXPIRY * 60 * 1000;

    return forgotToken;
};

module.exports = mongoose.model('user', userSchema);
