import React from 'react';

import './BurgerMenu.css';

const BurgerMenu =({component: Component, loggedIn, changeHeaderMenu, headerMenuBurger })=> {
  return (
    <div className="header__burger-menu">
      {loggedIn ? (<Component
                    changeHeaderMenu={changeHeaderMenu}
                    headerMenuBurger={headerMenuBurger} />) : null }
    </div>
  )
}

export default BurgerMenu;