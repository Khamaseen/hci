const _Lodash = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const {User, validate} = require('../node/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

run();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered');

    user = new User(_Lodash.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_Lodash.pick(user, ['name', 'email', 'id']));
});



module.exports = router; 