const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Timeline = require('../models/timeline');

router.get('/', (req, res, next) => {
    Timeline.find()
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
    const timeline = new Timeline({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        paragraph: req.body.paragraph
    });

    timeline
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Timeline added to database.',
                createdTimeline: timeline,
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
    Timeline.deleteMany({})
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