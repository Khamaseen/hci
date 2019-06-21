const mongoose = require('mongoose');

const timelineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    paragraph: String
});

module.exports = mongoose.model('Timeline', timelineSchema);