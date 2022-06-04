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
const WhereClause = require('../Utils/WhereClause');
const {
    likeNotification,
    removeLikeNotification,
} = require('./notifcationController');

// title , image , description  , tags , author
exports.createPost = BigPromise(async (req, res, next) => {
    const { title, photo, description, tags, userId } = req.body;

    const { user_id, _id } = req.user;

    if (userId !== user_id) {
        return next(CustomError(res, 'You are not authorized', 403));
    }
    if (!(title && description && tags)) {
        return next(CustomError(res, 'All Details are required!', 401));
    }
    if (photo && !validator.isDataURI(photo)) {
        return next(CustomError(res, 'Profile Photo is required', 401));
    }

    const postData = {
        title,
        description,
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
        .populate('author', 'name username profile_photo')
        .sort({ createdAt: 'descending' });

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
        )
        .populate({
            path: 'comments',
            populate: {
                path: 'author likes',
                select: 'name username profile_photo user_id _id',
            },
        });

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
        'author tags comments',
        'user_id name author _id',
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

    // delete comments from user
    for (const comment of post.comments) {
        await User.findByIdAndUpdate(comment.author, {
            $pull: { comments: comment._id },
        });
    }

    // delete bookmark
    for (const bookmark of post.bookmarks) {
        await User.findByIdAndUpdate(bookmark, {
            $pull: { bookmarks: post._id },
        });
    }

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

exports.likeUnlikePost = BigPromise(async (req, res, next) => {
    const { postId } = req.params;

    const { _id } = req.user;

    let post = await Post.findOne({ post_id: postId });

    if (!post) {
        return next(CustomError(res, 'Post Not found', 403));
    }

    if (!post.likes.includes(_id.toString())) {
        await Post.findOneAndUpdate(
            { post_id: postId },
            {
                $push: { likes: _id },
            },
        );

        await likeNotification({
            senderId: _id,
            postId: post._id,
            receiverId: post.author,
        });
    } else if (post.likes.includes(_id.toString())) {
        await Post.findOneAndUpdate(
            { post_id: postId },
            {
                $pull: { likes: _id },
            },
        );

        await removeLikeNotification({
            senderId: _id,
            postId: post._id,
            receiverId: post.author,
        });
    }

    post = await Post.findOne({ post_id: postId }).populate({
        path: 'tags author',
        select: 'name username name profile_photo',
    });

    res.status(200).json({
        success: true,
        post,
    });
});

exports.unicronUnunicornPost = BigPromise(async (req, res, next) => {
    const { postId } = req.params;

    const { _id } = req.user;

    const post = await Post.findOne({ post_id: postId }).populate({
        path: 'tags author',
        select: 'name username name profile_photo',
    });

    if (!post) {
        return next(CustomError(res, 'Post Not found', 403));
    }

    if (!post.unicorns.includes(_id.toString())) {
        post.unicorns.push(_id);
    } else if (post.unicorns.includes(_id.toString())) {
        post.unicorns = post.unicorns.filter(
            (user) => user.toString() !== _id.toString(),
        );
    }

    await post.save();

    res.status(200).json({
        success: true,
        post,
    });
});

exports.bookmarkUnBookmarkPost = BigPromise(async (req, res, next) => {
    const { postId } = req.params;

    const { _id } = req.user;

    let post = await Post.findOne({ post_id: postId }).populate({
        path: 'tags author',
        select: 'name username name profile_photo',
    });

    if (!post) {
        return next(CustomError(res, 'Post Not found', 403));
    }

    if (!post.bookmarks.includes(_id.toString())) {
        post.bookmarks.push(_id);

        await User.findByIdAndUpdate(_id, {
            $addToSet: { bookmarks: post._id },
        });
    } else if (post.bookmarks.includes(_id.toString())) {
        post.bookmarks = post.bookmarks.filter(
            (user) => user.toString() !== _id.toString(),
        );

        await User.findByIdAndUpdate(_id, {
            $pull: { bookmarks: post._id },
        });
    }

    await post.save();

    res.status(200).json({
        success: true,
        post,
    });
});

exports.searchPost = BigPromise(async (req, res, next) => {
    // const resultPerPage = 8;

    if (req.query.search === '') {
        return res.status(200).json({
            success: true,
            posts: [],
        });
    }

    let posts = new WhereClause(Post.find(), req.query).search();
    // .pager(resultPerPage);

    posts = await posts.base;

    res.status(200).json({
        success: true,
        posts,
    });
});
