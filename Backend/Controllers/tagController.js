const Tag = require('../Models/Tag');
const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const Post = require('../Models/Post');

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

exports.createTag = createTag;
exports.deleteTags = deleteTags;
exports.updateTags = updateTags;
