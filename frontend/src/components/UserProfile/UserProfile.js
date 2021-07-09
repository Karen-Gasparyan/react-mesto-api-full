import React from 'react';

import MyProfile from '../MyProfile/MyProfile';

import './UserProfile.css';


const UserProfile =({loggedIn, userEmail, signOut})=> {
  return (
    <div className="user__profile">
      {loggedIn ? <MyProfile userEmail={userEmail} signOut={signOut} /> : null}
    </div>
  )
}

export default UserProfile;