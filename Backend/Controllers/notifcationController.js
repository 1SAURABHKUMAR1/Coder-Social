const BigPromise = require('../Middleware/bigPromise');
const Notification = require('../Models/Notification');

exports.getAllNotifications = BigPromise(async (req, res, next) => {
    const { _id } = req.user;

    const notification = await Notification.find({ receiver: _id })
        .populate('receiver', 'name username user_id profile_photo _id')
        .populate('sender', 'name username user_id profile_photo _id')
        .populate({
            path: 'comment',
            select: 'body ',
        })
        .sort({ createdAt: 'descending' });

    await Notification.updateMany({ receiver: _id }, { read: true });

    res.status(200).json({
        success: true,
        notification,
    });
});

exports.getUnreadNotifications = BigPromise(async (req, res, next) => {
    const { _id } = req.user;

    const notification = await Notification.find({
        receiver: _id,
        read: false,
    })
        .populate('receiver', 'name username user_id profile_photo _id')
        .populate('sender', 'name username user_id profile_photo _id')
        .populate({
            path: 'comment',
            select: 'body ',
        })
        .sort({ createdAt: 'descending' });

    res.status(200).json({
        success: true,
        notification,
    });
});

const commentNotification = BigPromise(
    async ({ senderId, receiverId, postId, commentId }) => {
        await Notification.create({
            type: 'Comment',
            sender: senderId,
            receiver: receiverId,
            post: postId,
            comment: commentId,
        });
    },
);

const removeCommentNotification = BigPromise(
    async ({ senderId, receiverId, postId, commentId }) => {
        console.log(commentId);

        await Notification.findOneAndDelete({
            receiver: receiverId,
            type: 'Comment',
            sender: senderId,
            post: postId,
            comment: commentId,
        });
    },
);

const followNotification = BigPromise(async ({ senderId, receiverId }) => {
    await Notification.create({
        sender: senderId,
        receiver: receiverId,
        type: 'Follow',
    });
});

const removeFollowNotification = BigPromise(
    async ({ senderId, receiverId }) => {
        await Notification.findOneAndDelete({
            receiver: receiverId,
            sender: senderId,
            type: 'Follow',
        });
    },
);

const likeNotification = BigPromise(
    async ({ senderId, postId, receiverId }) => {
        await Notification.create({
            type: 'Like',
            sender: senderId,
            receiver: receiverId,
            post: postId,
        });
    },
);

const removeLikeNotification = BigPromise(
    async ({ senderId, postId, receiverId }) => {
        await Notification.findOneAndDelete({
            receiver: receiverId,
            type: 'Like',
            sender: senderId,
            post: postId,
        });
    },
);

exports.commentNotification = commentNotification;
exports.removeCommentNotification = removeCommentNotification;
exports.followNotification = followNotification;
exports.removeFollowNotification = removeFollowNotification;
exports.likeNotification = likeNotification;
exports.removeLikeNotification = removeLikeNotification;
