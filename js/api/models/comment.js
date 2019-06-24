const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String, 
        required: true
    },
    paragraph: {
        type: String, 
        required: true
    }
});

//--> Hard to let to schemas refer each other.? Also not needed?

// post:{
//     _id: mongoose.Schema.Types.ObjectId,
//     ref: 'Post'
// }

module.exports = mongoose.model('Comment', commentSchema);