import React, { useState, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';


function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  loading,
  resetForms
}) {
  
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [placeNameError, setPlaceNameError] = useState('');
  const [placeLinkError, setPlaceLinkError] = useState('');

  const [placeInfoDirty, setPlaceInfoDirty] = useState(false);
  const [validForm, setValidForm] = useState(false);


  useEffect(()=> {
    if(!name || !link || placeNameError || placeLinkError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [name, link, placeNameError, placeLinkError])


  useEffect(()=> {
    if(resetForms) {
      setName('');
      setLink('');
      setPlaceNameError('');
      setPlaceLinkError('');
      setPlaceInfoDirty(false);
      setValidForm(false);
    }
  }, [resetForms])


  function handleChangePlaceTitle(e) {
    setName(e.target.value);

    if(e.target.value.length < 2 || e.target.value.length >= 30) {
      setPlaceNameError('Название не может содержать менее 2 и более 30 символов');
      setPlaceInfoDirty(true);
    } else {
      setPlaceNameError('');
    }
  };


  function handleChangePlaceLink(e) {
    setLink(e.target.value);

    const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value);

    if(!valid) {
      setPlaceLinkError('Введите URL');
      setPlaceInfoDirty(true);
    } else {
      setPlaceLinkError('');
      setPlaceInfoDirty(false);
      setValidForm(true);
    }
  };


  function blurHandler(e) {
    if (!e.target.value && e.target.name === 'placeTitle') {
      setPlaceNameError('Поле не может быть пустым');
    } else if (!e.target.value && e.target.name === 'placeLink') {
      setPlaceLinkError('Поле не может быть пустым');
    }
  };


  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({name, link});
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'img'}
      buttonText={loading ? 'Создается...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonValidation={validForm} >
        <div className="pop-up__input-wrapper">
          <input
            name="placeTitle"
            required
            minLength="2"
            maxLength="30"
            autoComplete="off"
            placeholder="Название"
            type="text"
            className="pop-up__input-text pop-up__input-text_type_title"
            id="placeName"
            value={name}
            onChange={handleChangePlaceTitle}
            onBlur={blurHandler}
          />
          {(placeInfoDirty && placeNameError) && <span id="placeName-error" className="error">{placeNameError}</span> }
        </div>
        <div className="pop-up__input-wrapper">
          <input
            name="placeLink"
            required
            autoComplete="off"
            placeholder="Ссылка на картинку"
            type="url"
            className="pop-up__input-text pop-up__input-text_type_link"
            id="linkToImage"
            value={link}
            onChange={handleChangePlaceLink}
            onBlur={blurHandler}
          />
          {(placeInfoDirty && placeLinkError) && <span id="linkToImage-error" className="error">{placeLinkError}</span> }
        </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;