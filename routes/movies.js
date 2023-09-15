const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegex = require('../utils/constants');
const {
  getMoviesFromDB,
  createMovie,
  deleteMovie,
} = require('../controllers/cards');

// GET /movies все сохранённые пользователем фильмы;
// POST /movies создаёт фильм с переданными в теле данными;
// DELETE /movies/_id

// GET — возвращает все карточки
router.get('/', getMoviesFromDB);
// POST — создаёт фильм с переданными в теле данными;
router.post('/',
// celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().pattern(urlRegex),
//   }),
// }),
createMovie);
// DELETE — удаляет карточку по идентификатору
router.delete('/:movieId',
// celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().length(24).hex().required(),
//   }),
// }),
deleteMovie);


module.exports = router;
