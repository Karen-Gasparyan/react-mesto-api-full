const PORT = 3000;
const JWT_SECRET_KEY = 'super-secret-key';
const IMAGE_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

module.exports = {
  PORT,
  JWT_SECRET_KEY,
  IMAGE_REGEX,
};
