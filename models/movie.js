const Joi = require("joi");
const mongoose = require("mongoose");
const {genreSchema} = require("../models/genre");

const Movie = mongoose.model('Movie',mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        required:true
    }
}));

function validate(data){
    const schema = Joi.object({
        title : Joi.string().min(5).max(50).required(),
        genreId :Joi.objectId().required(),
        numberInStock : Joi.number().required(),
        dailyRentalRate : Joi.number().required()
    });

    return schema.validate(data);
}

exports.Movie = Movie;
exports.validate = validate;