const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
if (!SECRET_KEY) {
  throw new Error('нет ключа работать не буду');
}

const UnAutorizedError = require('../errors/UnAuthtorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAutorizedError('Авторизируйтесь(хедер авторизации пустой или не начинается с bearer)');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnAutorizedError("Необходима авторизация");
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
