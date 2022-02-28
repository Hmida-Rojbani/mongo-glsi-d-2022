const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const course_schema = new mongoose.Schema({
    title : {
        type : String,
        unique: true,
        required: true
    },
    author : {
            name : String,
            id : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author'
            }
        }, 
    tags : {
        type: [String],
        validate : {
            validator : function (elm) {
                return elm && elm.length >= 2;
            },
            message : 'Course must have at least two tags.'
        }
    },
    date : {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean,
    price : {
        type: Number,
        required : function () {
            return this.isPublished;
        }
    }
});

const course_validation = Joi.object({
    title : Joi.string().min(3).required(),
    author : Joi.objectId().required(),
    tags: Joi.array().items(Joi.string().min(2)).required(),
    date : Joi.date(),
    isPublished: Joi.boolean(),
    price: Joi.number().positive()
});

const Course = mongoose.model('Course',course_schema);

module.exports.Course = Course;
module.exports.course_validation = course_validation;