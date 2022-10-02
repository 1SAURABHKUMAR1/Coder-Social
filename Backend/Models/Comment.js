const mongoose = require('mongoose');
const uuid = require('uuid').v4;

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'Comment Body is required!'],
        sparse: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Comment Author is required!'],
        sparse: true,

        ref: 'user',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Post Id is required'],
        sparse: true,
        ref: 'post',
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    parent_comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    },
    comment_id: {
        type: String,
        default: uuid,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('comment', commentSchema);
