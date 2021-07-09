import React from 'react';

import doneIcon from '../images/infoTooltip-done.svg';
import errorIcon from '../images/infoTooltip-error.svg';

function MessagePopup({title, isOpen, messageIcon}) {

  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
        <div className="pop-up__container">
        <img
          src={messageIcon ? doneIcon : errorIcon}
          alt={messageIcon ? 'Успешно' : 'Ошибка'}
          style={{width: '50px', height: '50px', margin: '0 auto 15px'}} />
          <h2
            className="pop-up__title"
            style={{margin: '0', textAlign: 'center'}} >
            {title}
          </h2>
      </div>
  </div>
  );
};

export default MessagePopup;