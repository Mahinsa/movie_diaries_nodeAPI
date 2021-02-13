"use strict";

var express = require("express");

var _require = require("../models/genre"),
    Genre = _require.Genre;

var _require2 = require("../models/movie"),
    Movie = _require2.Movie,
    validate = _require2.validate;

var auth = require("../middleware/auth");

var admin = require("../middleware/admin");

var router = express.Router();
router.get("/", function _callee(req, res) {
  var movies;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Movie.find());

        case 2:
          movies = _context.sent;
          res.send(movies);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:id", function _callee2(req, res) {
  var movies;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Movie.findById(req.params.id));

        case 2:
          movies = _context2.sent;
          if (movies) res.send(movies);else {
            res.send("There is no movie realted with provided id");
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/", auth, function _callee3(req, res) {
  var result, genre, movie;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          result = validate(req.body);

          if (!result.error) {
            _context3.next = 4;
            break;
          }

          res.send(result.error.details[0].message);
          return _context3.abrupt("return");

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(Genre.findById(req.body.genreId));

        case 6:
          genre = _context3.sent;

          if (genre) {
            _context3.next = 10;
            break;
          }

          res.send("Invalid genreId");
          return _context3.abrupt("return");

        case 10:
          movie = new Movie({
            title: req.body.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
          });
          _context3.next = 13;
          return regeneratorRuntime.awrap(movie.save());

        case 13:
          res.send(movie);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.put("/:id", auth, function _callee4(req, res) {
  var result, genre, movie;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          result = validate(res.body);

          if (!result.error) {
            _context4.next = 4;
            break;
          }

          res.send(result.error.details[0].message);
          return _context4.abrupt("return");

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(Genre.findById(req.body.genreId));

        case 6:
          genre = _context4.sent;

          if (genre) {
            _context4.next = 10;
            break;
          }

          res.send("Invalid genreId");
          return _context4.abrupt("return");

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(Movie.findByIdAndUpdate({
            _id: req.params.id
          }, {
            title: req.body.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
          }, {
            "new": true
          }));

        case 12:
          movie = _context4.sent;

          if (movie) {
            res.send(movie);
          }

          res.send("Invalid movie ID");

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router["delete"]("/:id", [auth, admin], function _callee5(req, res) {
  var movie;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Movie.findByIdAndRemove(req.params.id));

        case 2:
          movie = _context5.sent;

          if (movie) {
            res.send(movie);
          }

          res.send("Invalid movie ID");

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;