const _Lodash = require('lodash');
const {User, validate} = require('../node/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered');

    user = new User(_Lodash.pick(req.body, 
        ['name', 'email', 'password']));

    await user.save();


    res.send(_Lodash.pick(user, ['name', 'email', 'id']));
});



module.exports = router; 