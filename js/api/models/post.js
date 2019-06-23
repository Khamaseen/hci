const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String, 
        required: true
    },
    paragraph: {
        type: String, 
        required: true
    },
    date:{
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);