const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const { signToken } = require('../utils/jwt');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { DataError } = require('../utils/errors/DataError');
const { AccessError } = require('../utils/errors/AccessError');

const getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) { throw new NotFoundError('Нет пользователя с таким id'); }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;
  User.create(req.body)
    .then((user) => {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new DataError('указаны некорректные данные'));
      }
      if (err.code === 11000) { next(new AccessError('пользовталеь с таким email уже зарегистрирован')); }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError('пользователь не найден'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new DataError('указаны некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new AccessError('пользовталеь с таким email уже зарегистрирован'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) { throw new NotFoundError('Неправильная почта или пароль'); }
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) { return next(new NotFoundError('Неправильная почта или пароль')); }
        const result = signToken(user._id);
        return res.send({ data: result });
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
};
