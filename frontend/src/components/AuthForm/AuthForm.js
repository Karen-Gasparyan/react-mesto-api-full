import React from 'react';

import './authForm.css';


const AuthForm =(
  {authData: {
    email,
    password,
    emailError,
    passwordError,
    authDirty,
    validForm,
    handleChangeEmail,
    handleChangePassword,
    blurHandler,
  },
    submitButtonText,
    onSubmit,
    name
  })=> {

  return (
    <form
      name={name}
      className="auth__form"
      onSubmit={onSubmit} >
      <div className="auth__inputs-wrapper">
        <div className="auth__input-wrapper">
          <input 
            className="auth__input-text auth__input-text_type_email"
            type="email"
            name="email"
            required
            minLength="6"
            autoComplete="off"
            placeholder="Email"
            onBlur={blurHandler}
            value={email}
            onChange={handleChangeEmail} />
          {(authDirty && emailError) && <span id="email-error" className="error">{emailError}</span> }
        </div>
        <div className="auth__input-wrapper">
          <input 
            className="auth__input-text auth__input-text_type_password"
            type="password"
            name="password"
            required
            minLength="8"
            maxLength="50"
            autoComplete="off"
            placeholder="Пароль"
            onBlur={blurHandler}
            value={password}
            onChange={handleChangePassword} />
          {(authDirty && passwordError) && <span id="password-error" className="error">{passwordError}</span> }
        </div>
      </div>
      <button
        type="submit"
        className={`auth__register-btn ${!validForm ? 'auth__register-btn_invalid' : '' }`}
        disabled={!validForm}
      >{submitButtonText}
      </button>
    </form>
  )
}

export default AuthForm;