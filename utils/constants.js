const ENG_REGEX = /^[?!,.a-zA-Z0-9\s]+$/;
const RU_REGEX = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
const LINK_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const LOCAL_SECRET_JWT = 'diploma secret key';

const ALLOWED_CORS = [
  'https://praktikum.tk',
  'http://localhost:4000',
  'http://localhost:4001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  ENG_REGEX,
  RU_REGEX,
  LINK_REGEX,
  LOCAL_SECRET_JWT,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
