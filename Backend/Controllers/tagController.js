const Tag = require('../Models/Tag');
const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const Post = require('../Models/Post');

exports.createTag = async (tags, post, next) => {
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
    next();
};
