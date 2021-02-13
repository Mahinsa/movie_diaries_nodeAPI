const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const { Movie } = require("../models/movie");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (genre) res.send(genre);
  else {
    res.send("There is no genre realted with provided id");
  }
});

router.get("/findByName/:name", async (req, res) => {
  const genre = await Genre.findOne({
    name: req.params.name,
  });
  if (genre) res.send(genre);
  else {
    res.send("There is no genre realted with provided name");
  }
});

router.get("/checkUsage/:id/:name", async (req, res) => {
  const movie = await Movie.findOne({
    genre: {
      _id: req.params.id,
      name: req.params.name,
    },
  });
  if (movie) res.send(true);
  else {
    res.send(false);
  }
});

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) {
    res.send("There is no genre realted with provided id");
    return;
  }

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    res.send("There is no genre realted with provided id");
    return;
  }

  res.send(genre);
});

module.exports = router;
