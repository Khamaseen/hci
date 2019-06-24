// const auth = require('../middleware/auth'); //should be our own auth
const _Lodash = require('lodash');
const jwt = require('jsonwebtoken');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/user/:userID', (req, res, next) => {
    console.log("in the correct function")
    const userid = req.params.userID
    console.log(userid)
        User.findById(userid) //change to email as this is unique
            .exec()
            .then(retrievedUser => {
                if (retrievedUser.length < 1) {
                    return res.status(401).json({
                        message: 'no such user'
                    })
                }
                console.log(retrievedUser)
                res.status(201).json({
                    user: retrievedUser
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
})

//more secure -- middleware auth in need of x-auth-token-jsonweb
router.get('/', async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(_Lodash.pick(user, ['_id', 'name', 'email']));
});

router.post('/login', (req, res, next) => {
    console.log(`Trying to find email:`)
    User.find({email: req.body.email}) //change to email as this is unique
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if (req.body.password != user[0].password) {
                res.status(401).json({
                    message: 'Auth failed'
                })
            }

            console.log(`checking password: ${user[0].password} to ${req.body.password}`)
            if (req.body.password == user[0].password) {
                console.log("password OK")
                res.status(200).json({
                    message: 'Auth succesfull',
                    token: user[0].generateAuthToken(),
                    userID: user[0]._id
                })
                console.log("json send")
            }
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.put('/:userID', (req, res, next) => {
    console.log("put")
    const userid = req.params.userID
    console.log(userid)
        User.findById(userid) //change to email as this is unique
            .exec()
            .then(retrievedUser => {
                if (retrievedUser.length < 1) {
                    return res.status(401).json({
                        message: 'no such user'
                    })
                }
                console.log(retrievedUser)
                retrievedUser.lastRelapse = req.body.lastRelapse
                res.status(201).json({
                    user: retrievedUser
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });    
})

router.post('/signup', (req, res, next) => {

    console.log("router user")

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dateofbirth: req.body.dateofbirth,
        dateOptedIn: req.body.dateOptedIn,
        lastRelapse: req.body.dateOptedIn,
        doctor: req.body.doctor,
        babyname: req.body.babyname,
        babydob: req.body.babydob
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json()
            console.log("res send ok")
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
        console.log("user signed up done")
});

module.exports = router; 