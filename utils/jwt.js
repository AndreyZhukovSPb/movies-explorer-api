require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const { LOCAL_SECRET_JWT } = require('./constants');

const signToken = (id) => {
  try {
    const token = jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : LOCAL_SECRET_JWT, { expiresIn: '7d' });
    return token;
  } catch (e) {
    return false;
  }
};

module.exports = {
  signToken,
};
