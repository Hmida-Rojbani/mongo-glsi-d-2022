const mongoose = require('mongoose');

const author_schema = new mongoose.Schema({
        name: String,
        email : String
});

const course_schema = new mongoose.Schema({
    title : String,
    author : {
        name : String,
        id : {
            type: Schema.Types.ObjectId,
            ref: 'Author'
        }
    }, 
    tags : [String],
    date : {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean,
    price : Number
});

const Course = mongoose.model('Course',course_schema);

module.exports.Course = Course;