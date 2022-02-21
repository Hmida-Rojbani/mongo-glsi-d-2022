const mongoose = require('mongoose');

const course_schema = new mongoose.Schema({
    title : String,
    author : {
        type: Schema.Types.ObjectId,
        ref: 'Author'
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