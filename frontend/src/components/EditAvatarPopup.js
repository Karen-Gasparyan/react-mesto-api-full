import React, { useState, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  loading,
  resetForms
}) {
  const [avatarLink, setAvatarLink] = useState('');
  const [avatarLinkError, setAvatarLinkError] = useState('');
  const [avatarLinkDirty, setAvatarLinkDirty] = useState(false);
  const [validForm, setValidForm] = useState(false);

  
  useEffect(()=> {
    if(resetForms) {
      setAvatarLink('');
      setAvatarLinkError('');
      setAvatarLinkDirty(false);
      setValidForm(false);
    }
  }, [resetForms])


  useEffect(()=> {
    if(!avatarLink || avatarLinkError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [avatarLink, avatarLinkError])


  function handleChangeLinkInputValue(e) {
    setAvatarLink(e.target.value);

    const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value);

    if(!valid) {
      setAvatarLinkError('Введите URL');
      setAvatarLinkDirty(true);
    } else {
      setAvatarLinkError('');
      setAvatarLinkDirty(false);
      setValidForm(true);
    }
  };


  function blurHandler(e) {
    if (!e.target.value) {
      setAvatarLinkError('Поле не может быть пустым');
    }
  };


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarLink);

    setAvatarLink('');
  };


  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'change-avatar'}
      buttonText={loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonValidation={validForm} >
        <div className="pop-up__input-wrapper">
          <input
            name="linkToAvatar"
            required
            autoComplete="off"
            placeholder="Ссылка на картинку"
            type="url"
            className="pop-up__input-text pop-up__input-text_type_link"
            id="linkToAvatar"
            value={avatarLink}
            onChange={handleChangeLinkInputValue}
            onBlur={blurHandler}
          />
          {(avatarLinkDirty && avatarLinkError) && <span id="linkToAvatar-error" className="error">{avatarLinkError}</span> }
        </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;