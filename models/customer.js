const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model('Customer',new mongoose.Schema({
    isGold:{
        type:Boolean,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    }
}));

function validate(data){
    const schema = Joi.object({
        isGold : Joi.boolean().required(),
        name : Joi.string().required(),
        phone : Joi.string().min(10).max(10).required()
    });

    return schema.validate(data);
}

exports.Customer = Customer;
exports.validate = validate;