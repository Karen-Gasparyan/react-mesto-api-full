import React, {useState, useEffect} from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';


function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  loading,
  resetForms
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  
  const [userNameError, setUserNameError] = useState('');
  const [userDescriptionError, setUserDescriptionError] = useState('');

  const [userInfoDirty, setUserInfoDirty] = useState(false);
  const [validForm, setValidForm] = useState(false);


  useEffect(()=> {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [currentUser, isOpen]);


  useEffect(()=> {
    if(!userName || !userDescription || userNameError || userDescriptionError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [userName, userDescription, userNameError, userDescriptionError])


  useEffect(()=> {
    if(resetForms) {
      setUserNameError('');
      setUserDescriptionError('');
      setUserInfoDirty(false);
      setValidForm(false);
    }
  }, [resetForms])


  function handleChangeName(e) {
    setUserName(e.target.value);

    if(e.target.value.length < 2 || e.target.value.length >= 20) {
      setUserNameError('Имя не может содержать менее 2 и более 20 символов');
      setUserInfoDirty(true);
    } else {
      setUserNameError('');
    }
  };


  function handleChangeDescription(e) {
    setUserDescription(e.target.value);

    if(e.target.value.length < 2 || e.target.value.length >= 200) {
      setUserDescriptionError('Поле не может содержать менее 2 и более 200 символов');
      setUserInfoDirty(true);
    } else {
      setUserDescriptionError('');
    }
  };

  
  function blurHandler(e) {
    if (!e.target.value && e.target.name === 'userName') {
      setUserNameError('Поле не может быть пустым');
    } else if (!e.target.value && e.target.name === 'userAbout') {
      setUserDescriptionError('Поле не может быть пустым');
    }
  };


  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      userName,
      about: userDescription,
    });
  };


  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'edit'}
      buttonText={loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonValidation={validForm} >
        <div className="pop-up__input-wrapper">
          <input
            name="userName"
            value={userName || ''}
            required
            minLength="2"
            maxLength="20"
            autoComplete="off"
            placeholder="Введите ваше имя"
            type="text"
            className="pop-up__input-text pop-up__input-text_type_name"
            id="userName"
            onChange={handleChangeName}
            onBlur={blurHandler} />
          {(userInfoDirty && userNameError) && <span id="userName-error" className="error">{userNameError}</span> }
        </div>
        <div className="pop-up__input-wrapper">
          <input
            name="userAbout"
            value={userDescription || ''}
            required
            minLength="2"
            maxLength="200"
            autoComplete="off"
            placeholder="Введите вашу специальность"
            type="text"
            className="pop-up__input-text pop-up__input-text_type_about"
            id="userAbout"
            onChange={handleChangeDescription}
            onBlur={blurHandler} />
          {(userInfoDirty && userDescriptionError) && <span id="userAbout-error" className="error">{userDescriptionError}</span> }
        </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;