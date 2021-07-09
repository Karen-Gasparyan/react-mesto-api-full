import React from 'react';

import AuthForm from '../AuthForm/AuthForm';

import './register.css';


const Register =(
  { authData,
    handleSubmitRegister
  })=> {

  const handleSubmit =(e)=> {
    e.preventDefault();

    handleSubmitRegister();
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
        <AuthForm
          authData={authData}
          onSubmit={handleSubmit}
          name={'register'}
          submitButtonText={'Зарегистрироваться'} />
      <p className="register__text-question">Уже зарегистрированы? Войти</p>
    </div>
  )
}

export default Register;