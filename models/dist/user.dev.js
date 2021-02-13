"use strict";

var Joi = require("joi");

var jwt = require("jsonwebtoken");

var config = require("config");

var passwordComplexity = require("joi-password-complexity");

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  isAdmin: {
    type: Boolean
  }
});

userSchema.methods.generateAuthToken = function () {
  var token = jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin
  }, config.get("jwtPrivateKey"));
  return token;
};

var User = mongoose.model("User", userSchema);

function validateUser(user) {
  var schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required()
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;