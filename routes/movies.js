const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { LINK_REGEX, ENG_REGEX, RU_REGEX } = require('../utils/constants');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().regex(LINK_REGEX).required(),
      trailerLink: Joi.string().regex(LINK_REGEX).required(),
      thumbnail: Joi.string().regex(LINK_REGEX).required(),
      owner: Joi.string().length(24).hex().required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().regex(RU_REGEX).required(),
      nameEN: Joi.string().regex(ENG_REGEX).required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/:movieId',
  celebrate({
    params: {
      movieId: Joi.string().length(24).hex().required(),
      // movieId: Joi.number().required(),
    },
  }),
  deleteMovieById,
);

module.exports = router;
