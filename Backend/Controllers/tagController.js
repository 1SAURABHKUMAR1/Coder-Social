const Tag = require('../Models/Tag');
const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const Post = require('../Models/Post');
const User = require('../Models/User');
const mongoose = require('mongoose');

const createTag = async (tags, post) => {
    for (const tag of tags) {
        const tagSingle = await Tag.findOneAndUpdate(
            { name: tag },
            { $addToSet: { posts: post._id } },
            { upsert: true, new: true },
        );
        await Post.findOneAndUpdate(
            { post_id: post.post_id },
            { $addToSet: { tags: tagSingle._id } },
        );
    }
};

const deleteTags = async (tags, post) => {
    for (const tag of tags) {
        await Tag.findByIdAndUpdate(tag._id, {
            $pull: { posts: post._id },
        });
    }
};

const updateTags = async (tags, postTags, post) => {
    for (const tag of postTags) {
        const tagSingle = await Tag.findByIdAndUpdate(tag._id, {
            $pull: { posts: post._id },
        });

        await Post.findByIdAndUpdate(post._id, {
            $pull: { tags: tagSingle._id },
        });
    }

    await createTag(tags, post);
};

exports.getAllTags = BigPromise(async (req, res, next) => {
    const tags = await Tag.find();

    res.status(200).json({
        success: true,
        tags,
    });
});

exports.getSingleTag = BigPromise(async (req, res, next) => {
    const { tagName } = req.params;

    const tag = await Tag.findOne({ name: tagName }).populate({
        path: 'posts',
        select: 'author bookmarks comments createdAt description image likes post_id tags title unicorns',
        populate: {
            path: 'author tags',
            select: 'name username profile_photo _id ',
        },
    });

    if (!tag) return next(CustomError(res, 'Invalid Tag', 401));

    res.status(200).json({
        success: true,
        tag,
    });
});

exports.followUnfollowTag = BigPromise(async (req, res, next) => {
    const { tagId } = req.params;
    const { _id } = req.user;

    const tag = await Tag.findOne({ tag_id: tagId }).populate({
        path: 'posts',
        select: 'author bookmarks comments createdAt description image likes post_id tags title unicorns',
        populate: {
            path: 'author tags',
            select: 'name username profile_photo _id ',
        },
    });

    if (!tag) return CustomError(res, 'Tag Not Found', 401);

    if (!tag.followers.includes(_id.toString())) {
        tag.followers.push(_id);
        await User.findByIdAndUpdate(_id, { $addToSet: { tags: tag._id } });
    } else if (tag.followers.includes(_id.toString())) {
        tag.followers = tag.followers.filter(
            (user) => user.toString() !== _id.toString(),
        );
        await User.findByIdAndUpdate(_id, { $pull: { tags: tag._id } });
    }

    await tag.save();

    res.status(200).json({
        success: true,
        tag,
    });
});

exports.createTag = createTag;
exports.deleteTags = deleteTags;
exports.updateTags = updateTags;
