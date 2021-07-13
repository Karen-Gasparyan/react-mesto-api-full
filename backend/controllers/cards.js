const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const Forbidden = require('../errors/forbidden-error');
const BadRequest = require('../errors/bad-request-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      }
      next(error);
    });
};

module.exports.removeCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      return card;
    })
    .then((foundCard) => {
      if (foundCard.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.cardId)
          .then((remoteCard) => {
            res.send({ data: remoteCard });
          })
          .catch(next);
      }
      throw new Forbidden('Нет полномочий для удаления данной карточки');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена, либо переданы некорректные данные для постановки лайка');
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new NotFoundError('Карточка не найдена'));
      }
      next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена, либо переданы некорректные данные для удаления лайка');
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new NotFoundError('Карточка не найдена'));
      }
      next(error);
    });
};
