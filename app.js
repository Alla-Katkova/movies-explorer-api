/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config();
}
/* eslint-enable global-require */

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const errorsHandler = require('./middlewares/errorsHandler');
const { PORT, DB_URL } = require('./config');

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

// куки
app.use(cookieParser());

// общий роут для карточек юзеров сайнапа и сайнина и общей
app.use('/', require('./routes/index'));

// логгер ошибок
app.use(errorLogger);

// для работы celebrate
app.use(errors());

// централизация ошибок
app.use(errorsHandler);

app.listen(PORT);
