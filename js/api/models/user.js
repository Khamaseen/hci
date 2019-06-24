const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userToken = "valid"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    dateofbirth: {
        type: Date,
        require: true
    },
    dateOptedIn: {
        type: Date,
        require: true
    },
    lastRelapse: {
        type: String,
        require: true
    },
    doctor: {
        type: String,
        require: true
    },
    babyname: {
        type: String,
        require: true
    }, 
    babydob: {
        type: String,
        require: true
    },
    maritial: {
        type: String,
        require: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, userToken);
    console.log(`Token created: ${token}`)
    return token;
}

const User = mongoose.model('User3', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(2).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;