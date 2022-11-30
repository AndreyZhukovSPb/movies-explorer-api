require('dotenv').config();

const jwt = require('jsonwebtoken');

const { LOCAL_SECRET_JWT } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const { LogError } = require('../utils/errors/LogError');

const { RightsError } = require('../utils/errors/RightsError');

const tokenAuth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || bearerHeader === '') { throw new LogError('пустой токен'); }
  const token = bearerHeader.replace('Bearer ', '');
  try {
    const result = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : LOCAL_SECRET_JWT);
    User.findOne({ _id: result.id }).then((user) => {
      if (!user) { throw new RightsError('нет прав'); }
      req.user = {
        _id: result.id,
      };
      return next();
    });
  } catch (err) {
    next(new RightsError('нет прав'));
  }
};

module.exports = {
  tokenAuth,
};
