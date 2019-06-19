const _Lodash = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../node/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

run();

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password');

    res.send(true);
});


function validateUser(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(user, schema);
}


module.exports = router; 