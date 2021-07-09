const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT, IMAGE_REGEX } = require('./config');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
// const allowedCors = require('./middlewares/allowedCors ');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE',
  );

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // логгер запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(IMAGE_REGEX),
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}));

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use(() => {
  throw new NotFoundError('Нет ответа на данный запрос');
});

app.use(errorLogger); // логгер ошибок

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
