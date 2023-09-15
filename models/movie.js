const mongoose = require('mongoose');
const urlRegex = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  director: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Заполните поле'],
  },
  year: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  description: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  image: {
    type: String,
    required: [true, 'Заполните поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Некорректный url',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Заполните поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Некорректный url',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Заполните поле'],
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Некорректный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Заполните поле'],
  },
}, { versionKey: false });

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
