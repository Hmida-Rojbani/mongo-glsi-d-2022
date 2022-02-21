const mongoose = require('mongoose');
// normalise
const author_schema = new mongoose.Schema({
    name: String,
    email : String,
    courses : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

const Author = mongoose.model('Author',author_schema);

module.exports.Author = Author;