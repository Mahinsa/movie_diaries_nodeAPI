"use strict";

var express = require("express");

var bcrypt = require("bcrypt");

var _ = require("lodash");

var _require = require("../models/user"),
    User = _require.User,
    validate = _require.validate;

var auth = require("../middleware/auth");

var router = express.Router();
router.get("/me", auth, function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id).select("-password"));

        case 2:
          user = _context.sent;
          res.send(user);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/", function _callee2(req, res) {
  var _validate, error, user, salt, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _validate = validate(req.body), error = _validate.error;

          if (!error) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).send(error.details[0].message));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 6:
          user = _context2.sent;

          if (!user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("User already registered"));

        case 9:
          user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 12:
          salt = _context2.sent;
          _context2.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

        case 15:
          user.password = _context2.sent;
          _context2.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          token = user.generateAuthToken();
          res.header("x-auth-token", token).header("access-control-expose-headers", "x-auth-token").send(_.pick(user, ["_id", "name", "email"]));
          _context2.next = 25;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](0);
          res.send(_context2.t0);

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 22]]);
});
module.exports = router;