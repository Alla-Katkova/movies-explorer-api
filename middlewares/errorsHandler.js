// централизация ошибок
function errorsHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        // ? 'На сервере произошла ошибка'
        ? JSON.stringify(err)
        : message,
    });
  next();
};

module.exports = errorsHandler;