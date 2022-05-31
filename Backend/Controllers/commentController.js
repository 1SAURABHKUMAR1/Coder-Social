const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const Comment = require('../Models/Comment');
const Post = require('../Models/Post');
const User = require('../Models/User');

// required -> post_id ,body , parent_comment_id
exports.createComment = BigPromise(async (req, res, next) => {
    const { post_id, comment_body, parent_comment_id } = req.body;
    const { user_id, _id } = req.user;

    if (!(post_id && comment_body)) {
        return next(CustomError(res, 'All Details are mandatory', 401));
    }

    const post = await Post.findOne({ post_id });

    if (!post) {
        return next(CustomError(res, 'Post not found', 401));
    }

    let parent_comment;

    if (parent_comment_id) {
        parent_comment = await Comment.findOne({
            comment_id: parent_comment_id,
        });

        if (!parent_comment) {
            return next(CustomError(res, 'Comment not found', 401));
        }
    }

    let comment = await Comment.create({
        body: comment_body,
        author: _id,
        post: post._id,
        parent_comment: parent_comment?._id,
    });

    comment = await comment.populate(
        'author likes',
        'name username profile_photo user_id comment_id',
    );

    await User.findOneAndUpdate(
        { user_id },
        { $addToSet: { comments: comment._id } },
    );

    await Post.findOneAndUpdate(
        { post_id },
        { $addToSet: { comments: comment._id } },
    );

    res.status(200).json({
        success: true,
        comment,
    });
});

exports.updateComment = BigPromise(async (req, res, next) => {
    const { comment_body, comment_id } = req.body;

    if (!(comment_body && comment_id)) {
        return next(CustomError(res, 'All details are mandatory', 401));
    }

    const comment = await Comment.findOne({ comment_id }).populate(
        'author likes parent_comment',
        'name username profile_photo user_id comment_id',
    );

    if (!comment) {
        return next(CustomError(res, 'Comment Not found', 401));
    }

    comment.body = comment_body;

    await comment.save();

    res.status(200).json({
        success: true,
        comment,
    });
});

exports.deleteComment = BigPromise(async (req, res, next) => {
    const { commentId } = req.params;

    const { user_id, _id } = req.user;

    const comment = await Comment.findOne({ comment_id: commentId }).populate(
        'author post parent_comment',
    );

    if (!comment) {
        return next(CustomError(res, 'Comment Not Found', 401));
    }

    if (comment.author.user_id !== user_id) {
        return next(CustomError(res, 'Post Not Found', 401));
    }

    await User.findByIdAndUpdate(_id, { $pull: { comments: comment._id } });
    await Post.findByIdAndUpdate(comment.post._id, {
        $pull: { comments: comment._id },
    });

    const childComments = await Comment.find({
        parent_comment: comment._id,
    });

    for (const child of childComments) {
        await User.findByIdAndUpdate(child.author, {
            $pull: { comments: child._id },
        });
        await Post.findByIdAndUpdate(child.post, {
            $pull: { comments: child._id },
        });

        await child.remove();
    }

    await comment.remove();

    res.status(200).json({
        success: true,
    });
});

exports.likeUnlikeComment = BigPromise(async (req, res, next) => {
    const { commentId } = req.params;

    const { _id } = req.user;

    let comment = await Comment.findOne({ comment_id: commentId });

    if (!comment) {
        return next(CustomError(res, 'Post Not found', 403));
    }

    if (!comment.likes.includes(_id.toString())) {
        comment.likes.push(_id);
    } else if (comment.likes.includes(_id.toString())) {
        comment.likes = comment.likes.filter(
            (user) => user.toString() !== _id.toString(),
        );
    }

    comment = await comment.populate(
        'author likes parent_comment',
        'name username profile_photo user_id comment_id',
    );

    await comment.save();

    res.status(200).json({
        success: true,
        comment,
    });
});
