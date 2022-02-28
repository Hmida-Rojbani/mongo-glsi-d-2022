const mongoose = require('mongoose');
const Joi = require('joi');
const user_schema = new mongoose.Schema({
    username: {
        type :String,
        unique:true
    },
    email : String,
    password : String,
    role : String
});

const user_validation = Joi.object({
    username : Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password: Joi.ref('password'),
    role : Joi.string().required()

});

const User = mongoose.model('User', user_schema);

module.exports.User = User;
module.exports.user_validation = user_validation;