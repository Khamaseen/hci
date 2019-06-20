const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _Lodash = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../node/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

run();

// a webtoken is send inside the header.
// a webtoken is created with a private key in combination with some user info
// since the header should be secure in https it is hard to get the webtoken for other users
// logging out a user is done on the client side.. this leaves the jwt still valid
// a valid jwt can be used by anybody who has their hands on it
// experiation times for a jwt are reasonable.. blacklisting a jwt when they are logged out too.
// still basically jwt means: "one does not simply log out with jwt"


// validation of user with encrypted password
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

// authentication of a user
function validateUser(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(user, schema);
}


module.exports = router; 