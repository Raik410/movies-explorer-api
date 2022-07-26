const mongoose = require('mongoose');
const validateURL = require('../utils/validateURL/validateURL');

const movieSchema = mongoose.Schema(
  {
    country: {
      required: true,
      type: String,
    },
    director: {
      required: true,
      type: String,
    },
    duration: {
      required: true,
      type: Number,
    },
    year: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
      validate: validateURL,
    },
    trailerLink: {
      required: true,
      type: String,
      validate: validateURL,
    },
    thumbnail: {
      required: true,
      type: String,
      validate: validateURL,
    },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    movieId: {
      type: Number,
    },
    nameRU: {
      required: true,
      type: String,
    },
    nameEN: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);