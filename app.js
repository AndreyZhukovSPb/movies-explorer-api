require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const moviesRouter = require('./routes/movies');
const userRouter = require('./routes/users');
const { NotFoundError } = require('./utils/errors/NotFoundError');
const { corsAllower } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000, MONGO_URL = 'mongodb://localhost:27017/diplomadb' } = process.env;

const {
  createUser,
  login,
} = require('./controllers/users');

const { tokenAuth } = require('./middlewares/auth');

mongoose.connect(MONGO_URL, {});

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use(corsAllower);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(tokenAuth);

app.use('/users', userRouter);
app.use('/movies', moviesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('указаны некорректные данные'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
});
