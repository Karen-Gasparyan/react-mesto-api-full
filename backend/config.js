const PORT = process.env.PORT || 5000;
const IMAGE_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

module.exports = {
  PORT,
  IMAGE_REGEX,
};
