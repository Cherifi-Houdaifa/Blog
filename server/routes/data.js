var express = require('express');
var router = express.Router();

const postControllers = require('../controllers/post');
const commentControllers = require('../controllers/comment');

const passport = require('passport');

//              posts routes

// get all posts
router.get('/posts', postControllers.getPosts);

// get one post
router.get('/posts/:postid', postControllers.getPost);

// create a post
router.post(
    '/posts',
    passport.authenticate('jwt', { session: false }),
    postControllers.createPost
);

// update a post
router.put(
    '/posts/:postid',
    passport.authenticate('jwt', { session: false }),
    postControllers.updatePost
);

// delete a post
router.delete(
    '/posts/:postid',
    passport.authenticate('jwt', { session: false }),
    postControllers.deletePost
);

//              comments routes

// create comment on post
router.post('/posts/:postid/comments', commentControllers.createComment);

// update comment on post
router.put(
    '/posts/:postid/comments/:commentid',
    passport.authenticate('jwt', { session: false }),
    commentControllers.updateComment
);

// delete comment on post
router.delete(
    '/posts/:postid/comments/:commentid',
    passport.authenticate('jwt', { session: false }),
    commentControllers.deleteComment
);

module.exports = router;
