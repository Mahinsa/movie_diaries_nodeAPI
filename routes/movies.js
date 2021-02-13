const express = require("express");
const { Genre } = require("../models/genre");
const { Movie, validate } = require("../models/movie");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movies = await Movie.findById(req.params.id);
  if (movies) res.send(movies);
  else {
    res.send("There is no movie realted with provided id");
  }
});

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    res.send(result.error.details[0].message);
    return;
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.send("Invalid genreId");
    return;
  }

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  await movie.save();
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const result = validate(res.body);
  if (result.error) {
    res.send(result.error.details[0].message);
    return;
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    res.send("Invalid genreId");
    return;
  }

  const movie = await Movie.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (movie) {
    res.send(movie);
  }
  res.send("Invalid movie ID");
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (movie) {
    res.send(movie);
  }
  res.send("Invalid movie ID");
});

module.exports = router;
