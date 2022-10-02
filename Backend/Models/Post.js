const mongoose = require('mongoose');
const validator = require('validator');
const uuid = require('uuid').v4;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post Title is required'],
        sparse: true,
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
        sparse: true,
    },
    post_id: {
        type: String,
        unique: [true, 'Post ID must be unique'],
        required: [true, 'Post ID is required'],
        sparse: true,
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
            sparse: true,
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User Id is required'],
            sparse: true,
        },
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User Id is required'],
            sparse: true,
        },
    ],
    unicorns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'User Id is required'],
            sparse: true,
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Author user Id is required'],
        sparse: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('post', postSchema);
