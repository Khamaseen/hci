const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');

router.get('/', (req, res, next) => {
    Post.find()
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