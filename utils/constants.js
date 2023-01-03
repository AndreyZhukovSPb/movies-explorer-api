const ENG_REGEX = /^[?!"'’`Ё«»,:—öа-яА-Яё.a-zA-Z0-9\s]+$/;
const RU_REGEX = /^[?!,"'’`«».:—öa-zA-Zа-яА-ЯёЁ0-9\s]+$/;
const LINK_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const LOCAL_SECRET_JWT = 'diploma secret key';

const ALLOWED_CORS = [
  'https://praktikum.tk',
  'http://localhost:4000',
  'http://localhost:4001',
  'http://localhost:3000',
  'http://diploma.zhukov.nomoredomains.club',
  'https://diploma.zhukov.nomoredomains.club',
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
