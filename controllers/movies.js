const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { RightsError } = require('../utils/errors/RightsError');
const { DataError } = require('../utils/errors/DataError');

const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => {
    const UserMovies = [];
    movies.forEach((m) => {
      if (m.owner.toString() === req.user._id) { UserMovies.push(m); }
    });
    if (UserMovies.length === 0) { return next(new NotFoundError('у вас нет сохраненных фильмов')); }
    return res.send(UserMovies);
  })
  .catch((err) => {
    next(err);
  });

const createMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    owner: req.body.owner,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new DataError('указаны некорректные данные'));
      }
      return next(err);
    });
};

const deleteMovieById = (req, res, next) => Movie.findById(req.params.movieId)
  .then((movie) => {
    if (!movie) { throw new NotFoundError('фильм не найден'); }
    const ownerId = movie.owner.toString();
    if (ownerId !== req.user._id) { throw new RightsError('нет прав для удаления'); }
    return Movie.findByIdAndRemove(req.params.movieId)
      .then((data) => {
        if (!data) { return next(new NotFoundError('фильм не найден')); }
        return res.send(data);
      });
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return next(new DataError('переданы некорректные данные'));
    }
    return next(err);
  });

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
