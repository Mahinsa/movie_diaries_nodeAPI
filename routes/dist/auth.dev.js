"use strict";

var express = require("express");

var Joi = require("joi");

var _ = require("lodash");

var bcrypt = require("bcrypt");

var _require = require("../models/user"),
    User = _require.User;

var router = express.Router();
router.post("/", function _callee(req, res) {
  var _validate, error, user, validatePassword, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validate = validate(req.body), error = _validate.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context.sent;

          if (user) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Invalid username or password"));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 10:
          validatePassword = _context.sent;

          if (validatePassword) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Invalid username or password"));

        case 13:
          token = user.generateAuthToken();
          res.header("x-auth-token", token).header("access-control-expose-headers", "x-auth-token").send(_.pick(user, ["_id", "name", "email"]));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
});

function validate(req) {
  var schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.required()
  });
  return schema.validate(req);
}

module.exports = router;