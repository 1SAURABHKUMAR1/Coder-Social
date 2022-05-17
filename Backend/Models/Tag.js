const mongoose = require('mongoose');
const uuid = require('uuid').v4;

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            required: [true, 'Post Id is required'],
        },
    ],
    tag_id: {
        type: String,
        default: uuid,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('tag', tagSchema);
