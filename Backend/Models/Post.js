const mongoose = require('mongoose');
const validator = require('validator');
const uuid = require('uuid').v4;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post Title is required'],
        maxlength: [50, 'Title max length can be only 50'],
    },
    image: {
        id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    description: {
        type: String,
        required: [true, 'Post Description is required'],
        maxlength: [300, 'Description can only be 400 characters '],
    },
    post_id: {
        type: String,
        unique: [true, 'Post ID must be unique'],
        required: [true, 'Post ID is required'],
        default: uuid,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
            required: [true, 'Comment Id is required'],
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User Id is required'],
        },
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User Id is required'],
        },
    ],
    unicorns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User Id is required'],
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Author user Id is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('post', postSchema);
