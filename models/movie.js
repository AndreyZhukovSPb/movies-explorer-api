const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ENG_REGEX, RU_REGEX, LINK_REGEX } = require('../utils/constants');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_REGEX.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: mongoose.Types.ObjectId,
    // type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return RU_REGEX.test(v);
      },
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return ENG_REGEX.test(v);
      },
    },
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
