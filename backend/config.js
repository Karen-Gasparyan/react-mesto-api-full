const PORT = process.env.PORT || 5000;

const IMAGE_REGEX = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/i;

const DEFAULT_USER = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

const JWT_DEV = 'dev-secret';

module.exports = {
  PORT,
  IMAGE_REGEX,
  DEFAULT_USER,
  JWT_DEV,
};
