import React from 'react';

import SpinnerContext from '../contexts/SpinnerContext';
import Spinner from './spinner/Spinner';


function PopupWithForm({
  title,
  name,
  buttonText, 
  children,
  isOpen,
  onClose,
  onSubmit,
  submitButtonValidation
}) {
  const spinner = React.useContext(SpinnerContext);

  return(
    <div className={`pop-up pop-up_${name} ${isOpen ? 'pop-up_opened' : ''}`}>
        <div className="pop-up__container">
          <form
            className="pop-up__form"
            name={name}
            onSubmit={onSubmit}
            noValidate>
            <h2 className="pop-up__title">{title}</h2>
            {children}
            <button
              type="submit"
              aria-label="Кнопка отправки формы"
              className={`pop-up__save-btn ${!submitButtonValidation ? 'pop-up__save-btn_invalid' : '' }`}
              disabled={!submitButtonValidation} >
              {buttonText}
              {spinner ? <Spinner /> : null}
            </button>
          </form>
          <button
            type="button"
            aria-label="Кнопка закрытия модального окна"
            title="Закрыть"
            className="pop-up__close-btn"
            onClick={onClose}
          >
          </button>
      </div>
    </div>
  )
}

export default PopupWithForm;