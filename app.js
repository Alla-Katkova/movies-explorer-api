// require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');


const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

const app = express();

// логгер
app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/users', require('./routes/users'));

// логгер ошибок
app.use(errorLogger);

// для работы celebrate
app.use(errors());

// централизация ошибок
app.use((err, req, res, next) => {
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
});

app.listen(PORT);
