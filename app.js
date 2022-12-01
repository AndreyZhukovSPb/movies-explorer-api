require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { NotFoundError } = require('./utils/errors/NotFoundError');
const { corsAllower } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000, MONGO_URL = 'mongodb://localhost:27017/diplomadb' } = process.env;

const { tokenAuth } = require('./middlewares/auth');

const { errorHandler } = require('./utils/errors/ErrorHandler');

mongoose.connect(MONGO_URL, {});

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use(corsAllower);

app.use(require('./routes/sign'));

app.use(tokenAuth);

app.use(require('./routes/users'));

app.use(require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

// app.use((err, req, res, next) => {
//  const { statusCode = 500, message } = err;
//  res.status(statusCode)
//    .send({
//      message: statusCode === 500
//        ? 'На сервере произошла ошибка'
//        : message,
//    });
//  next();
// });

app.listen(PORT, () => {
});
