import React, {useEffect} from 'react';

import AuthForm from '../AuthForm/AuthForm';

import './login.css';


const Login =(
  { authData,
    handleSubmitLogin,
    setLoginPage
  })=> {

  useEffect(()=> {
    setLoginPage(true);
  })

  const handleSubmit =(e)=> {
    e.preventDefault();

    handleSubmitLogin();
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
        <AuthForm
          authData={authData}
          onSubmit={handleSubmit}
          name={'authorize'}
          submitButtonText={'Войти'} />
    </div>
  )
}

export default Login;