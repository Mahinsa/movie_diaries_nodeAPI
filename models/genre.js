const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    }
});

const Genre = mongoose.model('Genre',genreSchema);

function validate(data){
    const schema = Joi.object({
        name : Joi.string().min(5).max(50).required()
    });

    return schema.validate(data);
}
exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validate;