const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Заполните поле'],
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },

  email: {
    type: String,
    required: [true, 'Заполните поле'],
    unique: [true, 'Email уже существуют'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
        // return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Введите верный email или пароль',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле'],
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
