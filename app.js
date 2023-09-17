if (process.env.NODE_ENV === 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const errorsHandler = require('./middlewares/errorsHandler');
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

// исправление ошибки cors
app.use(cors());

// логгер
app.use(requestLogger);

// безопасность
app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// БД
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// общий роут для карточек юзеров сайнапа и сайнина и общей
app.use('/', require('./routes/index'));

// логгер ошибок
app.use(errorLogger);

// для работы celebrate
app.use(errors());

// централизация ошибок
app.use(errorsHandler);

app.listen(PORT);
