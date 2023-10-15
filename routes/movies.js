const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegex = require('../utils/constants');
const {
  getUsersMoviesFromDB,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// GET /movies все сохранённые пользователем фильмы;
router.get('/', getUsersMoviesFromDB);
/// POST /movies создаёт фильм с переданными в теле данными;
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlRegex),
      trailerLink: Joi.string().required().pattern(urlRegex),
      thumbnail: Joi.string().required().pattern(urlRegex),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
// DELETE /movies/_id
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
