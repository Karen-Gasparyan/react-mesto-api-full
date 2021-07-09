import React from 'react';
import {Link} from 'react-router-dom';

import './AuthButton.css';

const AuthButton =({loginPage, handleChangeLoginPage})=> {
  return (
    <Link
      to={loginPage ? '/signup' : '/signin'}
      onClick={handleChangeLoginPage}
      className="auth-button">
        {loginPage ? 'Регистрация' : 'Войти'}
    </Link>
  )
}

export default AuthButton;