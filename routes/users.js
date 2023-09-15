const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo,
  editUserInfo,
} = require('../controllers/users');

// роут для получения информации о пользователе
router.get('/me', getUserInfo);

// PATCH /users/me — обновляет профиль
router.patch('/me',
// celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().min(2).max(30),
//       about: Joi.string().min(2).max(30),
//     }),
//   }),
  editUserInfo,
);

module.exports = router;
