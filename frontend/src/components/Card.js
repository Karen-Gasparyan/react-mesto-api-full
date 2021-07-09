import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';


function Card({cardValues, onCardClick, onCardLike, onCardDelete}) {
  const {name, link, likes, owner, _id} = cardValues;

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__deleted ${isOwn ? 'element__deleted_active' : ''}`;

  const isLiked = likes.some(other => other._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`; 

  
  const handleClick =()=> {
    onCardClick(name, link);
  }

  const handleLikeClick =()=> {
    onCardLike(likes, _id);
  }

  const handleDeleteClick =()=> {
    onCardDelete(_id);
  }

  return (
    <article className="element">
      <img
        src={link}
        alt={name}
        onError={(e)=> e.target.src = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}
        className="element__image"
        onClick={handleClick} />
      <button
        type="button"
        aria-label="Кнопка удаления карточки"
        title="Удалить"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}>
      </button>
      <div className="element__description-wrapper">
        <h2 className="element__title">{name}</h2>
        <div className="element__of-wrapper-likes">
          <button
            type="button"
            aria-label="Кнопка с отметкой - нравится"
            title="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}>
          </button>
          <p className="element__of-number-likes">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;