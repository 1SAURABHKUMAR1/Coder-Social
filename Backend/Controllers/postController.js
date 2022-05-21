const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const Post = require('../Models/Post');
const User = require('../Models/User');
const cloudinary = require('cloudinary').v2;
const validator = require('validator');
const {
    createTag,
    deleteTags,
    updateTags,
} = require('../Controllers/tagController');

// title , image , description  , tags , author
exports.createPost = BigPromise(async (req, res, next) => {
    const { title, photo, body, tags, userId } = req.body;

    const { user_id, _id } = req.user;

    if (userId !== user_id) {
        return next(CustomError(res, 'You are not authorized', 403));
    }
    if (!(title && body && tags)) {
        return next(CustomError(res, 'All Details are required!', 401));
    }
    if (photo && !validator.isDataURI(photo)) {
        return next(CustomError(res, 'Profile Photo is required', 401));
    }

    const postData = {
        title,
        description: body,
        author: _id,
    };

    if (photo) {
        const cloudinaryPhoto = await cloudinary.uploader.upload(photo, {
            folder: 'codersocial',
            crop: 'pad',
        });
        postData.image = {
            id: cloudinaryPhoto.public_id,
            secure_url: cloudinaryPhoto.secure_url,
        };
    }

    const post = await Post.create(postData);

    await User.findOneAndUpdate(
        { user_id },
        { $addToSet: { posts: post._id } },
    );

    await createTag(tags, post);

    res.status(200).json({
        success: true,
        post,
    });
});

exports.getAllPosts = BigPromise(async (req, res, next) => {
    const post = await Post.find()
        .populate('tags', 'name')
        .populate('author', 'name username profile_photo');

    res.status(200).json({
        success: true,
        post,
    });
});

exports.getSinglePost = BigPromise(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findOne({ post_id: postId })
        .populate('tags', 'name tag_id')
        .populate(
            'author',
            'name username profile_photo bio education user_id work createdAt location',
        );

    if (!post) {
        return next(CustomError(res, 'No Post Found', 201));
    }

    res.status(200).json({
        success: true,
        post,
    });
});

exports.deletePost = BigPromise(async (req, res, next) => {
    const { postId } = req.params;

    const { user_id, _id } = req.user;

    const post = await Post.findOne({ post_id: postId }).populate(
        'author tags',
        'user_id name',
    );

    if (!post) {
        return next(CustomError(res, 'Post Not Found', 401));
    }

    if (post.author.user_id !== user_id) {
        return next(CustomError(res, 'Post Not Found', 401));
    }

    if (post.image.id) {
        await cloudinary.uploader.destroy(post.image.id);
    }

    await User.findByIdAndUpdate(_id, { $pull: { posts: post._id } });

    await deleteTags(post.tags, post);

    await post.remove();

    res.status(200).json({
        success: true,
    });
});

// required => tags , title , description
// extra => photo
exports.updatePost = BigPromise(async (req, res, next) => {
    const { title, tags, description, photo } = req.body;

    const { postId } = req.params;

    const { user_id } = req.user;

    if (!(title && tags && description)) {
        return next(CustomError(res, 'All Fields are mandatory', 401));
    }

    const post = await Post.findOne({ post_id: postId }).populate(
        'author tags',
        'user_id name',
    );

    if (!post) {
        return next(CustomError(res, 'Post not found', 401));
    }

    if (post.author.user_id !== user_id) {
        return next(CustomError(res, 'You are not authorized', 401));
    }

    const newData = {
        title,
        description,
    };

    if (photo) {
        if (!validator.isDataURI(photo)) {
            return next(CustomError(res, 'Photo is not valid', 401));
        }

        if (post.image.id) {
            await cloudinary.uploader.destroy(post.image.id);
        }

        const cloudinaryPhoto = await cloudinary.uploader.upload(photo, {
            folder: 'codersocial',
            crop: 'pad',
        });

        newData.image = {
            id: cloudinaryPhoto.public_id,
            secure_url: cloudinaryPhoto.secure_url,
        };
    }

    await updateTags(tags, post.tags, post);

    post.title = newData.title;
    post.description = newData.description;
    photo && (post.image = newData.image);

    await post.save();

    res.status(200).json({
        success: true,
        post,
    });
});
