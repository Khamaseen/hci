const mongoose = require('mongoose');

const timelineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String, 
        required: true
    },
    paragraph: {
        type: String, 
        required: true
    },
});

module.exports = mongoose.model('Timeline', timelineSchema);