"use strict";

var express = require("express");

var auth = require("../middleware/auth");

var admin = require("../middleware/admin");

var _require = require("../models/genre"),
    Genre = _require.Genre,
    validate = _require.validate;

var _require2 = require("../models/movie"),
    Movie = _require2.Movie;

var router = express.Router();
router.get("/", function _callee(req, res) {
  var genres;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Genre.find());

        case 2:
          genres = _context.sent;
          res.send(genres);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:id", function _callee2(req, res) {
  var genre;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Genre.findById(req.params.id));

        case 2:
          genre = _context2.sent;
          if (genre) res.send(genre);else {
            res.send("There is no genre realted with provided id");
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/findByName/:name", function _callee3(req, res) {
  var genre;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Genre.findOne({
            name: req.params.name
          }));

        case 2:
          genre = _context3.sent;
          if (genre) res.send(genre);else {
            res.send("There is no genre realted with provided name");
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get("/checkUsage/:id/:name", function _callee4(req, res) {
  var movie;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Movie.findOne({
            genre: {
              _id: req.params.id,
              name: req.params.name
            }
          }));

        case 2:
          movie = _context4.sent;
          if (movie) res.send(true);else {
            res.send(false);
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post("/", auth, function _callee5(req, res) {
  var result, genre;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          result = validate(req.body);

          if (!result.error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).send(result.error.details[0].message));

        case 3:
          genre = new Genre({
            name: req.body.name
          });
          _context5.next = 6;
          return regeneratorRuntime.awrap(genre.save());

        case 6:
          res.send(genre);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.put("/:id", auth, function _callee6(req, res) {
  var result, genre;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          result = validate(req.body);

          if (!result.error) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).send(result.error.details[0].message));

        case 3:
          _context6.next = 5;
          return regeneratorRuntime.awrap(Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name
          }, {
            "new": true
          }));

        case 5:
          genre = _context6.sent;

          if (genre) {
            _context6.next = 9;
            break;
          }

          res.send("There is no genre realted with provided id");
          return _context6.abrupt("return");

        case 9:
          res.send(genre);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router["delete"]("/:id", [auth, admin], function _callee7(req, res) {
  var genre;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Genre.findByIdAndRemove(req.params.id));

        case 2:
          genre = _context7.sent;

          if (genre) {
            _context7.next = 6;
            break;
          }

          res.send("There is no genre realted with provided id");
          return _context7.abrupt("return");

        case 6:
          res.send(genre);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
});
module.exports = router;