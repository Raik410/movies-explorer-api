const mongoose = require('mongoose');

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
    },
    trailerLink: {
      required: true,
      type: String,
    },
    thumbnail: {
      required: true,
      type: String,
    },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    movieId: {
      type: String,
      required: true,
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
