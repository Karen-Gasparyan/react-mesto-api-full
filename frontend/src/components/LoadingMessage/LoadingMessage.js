import React from 'react';

import './LoadingMessage.css';


const LoadingMessage =({isOpen})=> {

  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
        <div className="pop-up__container">
          <div className="loadingio-spinner-spin-0nakerftw6lh LoadingMessage-spinner">
            <div className="ldio-j4d19yj87y">
              <div><div></div></div>
              <div><div></div></div>
              <div><div></div></div>
              <div><div></div></div>
              <div><div></div></div>
              <div><div></div></div>
              <div><div></div></div>
              <div><div></div></div>
            </div>
          </div>
          <h2 className="pop-up__title LoadingMessage-title">Загрузка...</h2>
      </div>
  </div>
  )
}

export default LoadingMessage;