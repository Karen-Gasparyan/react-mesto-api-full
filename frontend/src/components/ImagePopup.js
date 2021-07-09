import React from 'react';

function ImagePopup({card: {isOpen, name, link}, onClose}) {

  return (
    <div className={`pop-up pop-up_fullscreen ${isOpen ? 'pop-up_opened' : ''}`}>
      <div className="pop-up__container-fullscreen">
        <img
          src={link}
          alt="Карточка места"
          className="pop-up__image-fullscreen"
        />
        <p className="pop-up__captiion-fullscreen">{name}</p>
        <button
          type="button"
          aria-label="Кнопка закрытия модального окна"
          title="Закрыть"
          className="pop-up__close-btn"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
}

export default ImagePopup;