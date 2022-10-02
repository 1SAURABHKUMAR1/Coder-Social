const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    },
    type: {
        type: String,
        enum: ['Like', 'Comment', 'Follow'],
        required: true,
        sparse: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('notification', notificationSchema);
