const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');
const Comment = require('../models/comment');

router.get('/', (req, res, next) => {
    Post.find()
        .populate('comments', 'username paragraph')
        .exec()
        .then(docs => {
            let count = docs.length;
            res.status(200).json({
                count: count,
                docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        paragraph: req.body.paragraph,
        date: req.body.date
    });

    post
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                createdTimeline: post,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// Posting a comment to the server
router.post('/:postID', async (req, res, next) => {
    const post_id = req.params.postID;

    // Create the comment
    const new_comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        paragraph: req.body.paragraph,
    });

    // Find given post to add the comment to.
    const post = await Post.findById(post_id);
    post.comments.push(new_comment);
    
    post
        .save()
        .then(result => {
            res.status(201).json({
                new_post: post
            })
        })
        .catch(err => {
            res.status(501).json({
                error: err
            })
        });
})

router.delete('/', (req, res, next) => {
    Post.deleteMany({})
        .exec()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;