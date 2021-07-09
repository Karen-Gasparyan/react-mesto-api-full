import React from 'react';

import './MyProfile.css';


const MyProfile =({userEmail, signOut})=> {

  return (
    <div className="my-profile">
      <p className="my-profile__email">{userEmail}</p>
      <button onClick={signOut} className="my-profile__out-btn">Выйти</button>
    </div>
  )
}

export default MyProfile;