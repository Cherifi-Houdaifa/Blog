const Comment = require('../models/comment');
const Post = require('../models/post');
const isValidObjectId = require('mongoose').isValidObjectId;
const { body, validationResult } = require('express-validator');

exports.createComment = [
    body('name').exists().isLength({ max: 200 }).notEmpty().escape(),
    body('text').exists().notEmpty().escape(),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { postid } = req.params;
            if (!isValidObjectId(postid)) {
                res.json({ message: 'Invalid ObjectId' });
            }
            const comment = await Comment.create({
                name: req.body.name,
                text: req.body.text,
            });
            const post = await Post.findByIdAndUpdate(postid, {
                $push: { comments: comment._id },
            });
            return res.json(comment);
        } catch (err) {
            next(err);
        }
    },
];
exports.updateComment = [
    body('name').isLength({ max: 200 }).escape(),
    body('text').escape(),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { commentid } = req.params;
            if (!isValidObjectId(commentid)) {
                return res.json({ message: 'Invalid ObjectId' });
            }
            const { name, text } = req.body;
            const updateOptions = {};
            if (!name && !text) {
                return res.json({ message: 'There is nothing to update' });
            } else if (!name) {
                updateOptions.text = text;
            } else if (!text) {
                updateOptions.name = name;
            } else {
                updateOptions.name = name;
                updateOptions.text = text;
            }
            const comment = await Comment.findByIdAndUpdate(
                commentid,
                updateOptions,
                { new: true }
            );
            res.json(comment);
        } catch (err) {
            next(err);
        }
    },
];
exports.deleteComment = async function (req, res, next) {
    try {
        const { postid, commentid } = req.params;
        if (!isValidObjectId(postid) || !isValidObjectId(commentid)) {
            return res.json({ message: 'Invalid ObjectId' });
        }
        const comment = await Comment.findByIdAndDelete(commentid);
        Post.findById(postid, (err, post) => {
            if (err) {
                return next(err);
            }
            post.comments.pull(commentid);
            post.save();
            return res.json(comment);
        });
    } catch (err) {
        next(err);
    }
};
