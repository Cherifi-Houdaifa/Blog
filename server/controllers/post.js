const Post = require('../models/post');
const isValidObjectId = require('mongoose').isValidObjectId;
const { body, validationResult } = require('express-validator');

exports.getPosts = async function (req, res, next) {
    try {
        const posts = await Post.find({}).sort({ date: 'desc' }).exec();
        res.json(posts);
    } catch (err) {
        next(err);
    }
};
exports.getPost = async function (req, res, next) {
    try {
        const { postid } = req.params;
        const post = await Post.findById(postid).populate('comments').exec();

        if (!post) {
            return res.json({ message: 'Post Not Found' });
        }
        return res.json(post);
    } catch (err) {
        next(err);
    }
};
exports.createPost = [
    body('title').exists().isLength({ max: 300 }),
    body('text').exists().notEmpty(),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const post = await Post.create({
                title: req.body.title,
                text: req.body.text,
                dateCreated: Date.now(),
            });
            res.json(post);
        } catch (err) {
            next(err);
        }
    },
];
exports.updatePost = [
    body('title').isLength({ max: 300 }),
    body('text'),
    function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, text } = req.body;
            const postid = req.params.postid;
            if (!isValidObjectId(postid)) {
                res.json({ message: 'Invalid ObjectId' });
            }

            if (!title && !text) {
                return res.json({ message: 'There is nothing to update' });
            } else if (!title) {
                Post.findByIdAndUpdate(
                    postid,
                    {
                        text: text,
                    },
                    { new: true }
                ).then((result) => {
                    if (!result) {
                        return res.json({ message: 'Post not Found' });
                    }
                    return res.json(result);
                });
            } else if (!text) {
                Post.findByIdAndUpdate(
                    postid,
                    {
                        title: title,
                    },
                    { new: true }
                ).then((result) => {
                    if (!result) {
                        return res.json({ message: 'Post not Found' });
                    }
                    return res.json(result);
                });
            } else {
                Post.findByIdAndUpdate(
                    postid,
                    {
                        title: title,
                        text: text,
                    },
                    { new: true }
                ).then((result) => {
                    if (!result) {
                        return res.json({ message: 'Post not Found' });
                    }
                    return res.json(result);
                });
            }
        } catch (err) {
            next(err);
        }
    },
];
exports.deletePost = async function (req, res, next) {
    try {
        const { postid } = req.params;
        const post = await Post.findByIdAndDelete(postid);
        if (!post) {
            return res.json({ message: 'Post Not Found' });
        }
        res.json(post);
    } catch (err) {
        next(err);
    }
};
