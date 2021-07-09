import React from 'react';

import './infoTooltip.css';
import doneIcon from '../../images/infoTooltip-done.svg';
import errorIcon from '../../images/infoTooltip-error.svg';

const InfoTooltip =({isOpen, onClose, isDone, messageText})=> {

  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
        <div className="pop-up__container">
          <img
            src={isDone ? doneIcon : errorIcon}
            alt={isDone ? 'Успешно' : 'Ошибка'} 
            className="infoTooltip-icon" />

          <h2 className="pop-up__title infoTooltip-title" >{messageText}</h2>

          <button
            type="button"
            aria-label="Кнопка закрытия модального окна"
            title="Закрыть"
            className="pop-up__close-btn infoTooltip-button"
            onClick={onClose} >
          </button>
      </div>
    </div>
  )
}

export default InfoTooltip;