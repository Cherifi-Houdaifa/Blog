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

module.exports = router;
