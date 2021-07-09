import React from 'react';

import Logo from '../Logo/Logo';
import UserProfile from '../UserProfile/UserProfile';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MyProfile from '../MyProfile/MyProfile';
import AuthButton from '../AuthButton/AuthButton';

import './header.css';


function Header({
  component: Component,
  userEmail,
  loggedIn,
  visibleHeaderMenu,
  signOut,
  changeHeaderMenu,
  headerMenuBurger,
  loginPage,
  handleChangeLoginPage
}) {

  return (
    <>
      {(loggedIn && visibleHeaderMenu) ? <MyProfile userEmail={userEmail} signOut={signOut} /> : null}
      <div className="header page__header">

        <Logo />
        
        <UserProfile loggedIn={loggedIn} userEmail={userEmail} signOut={signOut} />

        {loggedIn ? (<BurgerMenu
                      component={Component}
                      loggedIn={loggedIn}
                      changeHeaderMenu={changeHeaderMenu}
                      headerMenuBurger={headerMenuBurger} />) : null}

        {!loggedIn ? <AuthButton loginPage={loginPage} handleChangeLoginPage={handleChangeLoginPage} /> : null}
      </div>
    </>
  )
}

export default Header;