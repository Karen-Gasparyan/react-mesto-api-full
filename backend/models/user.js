const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const { IMAGE_REGEX, DEFAULT_USER } = require('../config');

const { name, about, avatar } = DEFAULT_USER;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: name,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: about,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: avatar,
    validate(value) {
      const urlRegex = IMAGE_REGEX;
      return urlRegex.test(value);
    },
  },
  email: {
    type: String,
    minlength: 5,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Не валидный email');
      }
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject();
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
