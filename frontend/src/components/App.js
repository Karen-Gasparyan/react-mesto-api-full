import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';

import Header from './Header/Header';
import Main from './Main';
import Footer from './Footer';

import Login from './Login/Login';
import Register from './Register/Register';
import Loged from './Loged/Loged';
import ProtectedRoute from './ProtectedRoute';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import MessagePopup from './MessagePopup';
import LoadingMessage from './LoadingMessage/LoadingMessage';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';
import SpinnerContext from '../contexts/SpinnerContext';

import api from '../utils/api';
import auth from '../utils/auth';


function App() {
  /* States */
  const history = useHistory();

  // User info
  const [currentUser, setCurrentUser ] = useState({});
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState(null);

  // Header Menu
  const [visibleHeaderMenu, setVisibleHeaderMenu] = useState(false);
  const [headerMenuBurger, setHeaderMenuBurger] = useState(true);

  // Popups
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isMessagePopup, setIsMessagePopup] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageIcon, setMessageIcon] = useState(null);
  const [resetForms, setResetForms] = useState(false);

  // Cards
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [cardsError, setCardsError] = useState(null);

  // Auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPage, setLoginPage] = useState(false);
  
  // validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authDirty, setAuthDirty] = useState(false);
  const [validForm, setValidForm] = useState(false);
  /* /States */


  /* validation */
  useEffect(()=> {
    if (!email || !password || emailError || passwordError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [email, password, emailError, passwordError])

  function handleChangeEmail(e) {
    setEmail(e.target.value);

    if((e.target.name === 'email' && e.target.value.length < 6)) {
      setEmailError('Email не должен содержать менее 6 символов');
      setAuthDirty(true);
    } else {
      setEmailError('');
    }
  };

  function handleChangePassword(e) {
    setPassword(e.target.value);

    if((e.target.name === 'password' && e.target.value.length < 8)) {
      setPasswordError('Пароль не должен содержать менее 8 символов');
      setAuthDirty(true);
    } else {
      setPasswordError('');
    }
  }

  function blurHandler(e) {
    if (!e.target.value && e.target.name === 'email') {
      setEmailError('Поле не может быть пустым');
    } else if (!e.target.value && e.target.name === 'password') {
      setPasswordError('Поле не может быть пустым');
    }
  };
  /* validation */


  /* cards */
  useEffect(()=> {
    api.getInitialCards()
      .then(data => setCards(data))
      .catch(error => setCardsError(`${error} - Something went wrong`));
  }, []);

  function handleCardLike(selectedСardLikes, selectedСardID) {
    const isLiked = selectedСardLikes.some(otherUsers => otherUsers._id === currentUser._id);
    
    api.changeLike(selectedСardID, !isLiked)
      .then(selectedСard => {
        setCards(allCards => allCards.map(card => card._id === selectedСardID ? selectedСard : card));
        setMessageIcon(true);
    })
    .catch(error => handleMessagePopup(`Something went wrong - ${error}`));
    setMessageIcon(false);
  };

  function handleCardDelete(selectedСardID) {
    api.deleteCard(selectedСardID)
      .then(postDeleted => {
        setCards(allCards => allCards.filter(card => card._id !== selectedСardID));
        if(postDeleted) {
          handleMessagePopup('Пост успешно удален');
          setMessageIcon(true);
        }
      })
      .catch(error => {
        handleMessagePopup(`Something went wrong - ${error}`);
        setMessageIcon(false);
      });
  };

  function handleAddPlaceSubmit(newPlaceData) {
    setLoading(true);

    api.setNewCard(newPlaceData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        setLoading(false);
        closeAllPopups();
      })
      .catch(error => {
        handleMessagePopup(`Something went wrong - ${error}`);
        setMessageIcon(false);
        setLoading(false);
      });
  };
  /* /cards */


  /* user info */
  useEffect(()=> {
    api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(error => {
        setCurrentUser({
          name: error,
          about: 'Something went wrong',
          avatar: 'https://www.wpfixit.com/wp-content/uploads/2019/03/HTTP-error-when-uploading-images-in-WordPress.jpg'
        })
      });
  }, []);

  function handleUpdateAvatar(link) {
    setLoading(true);

    api.setUserAvatar(link)
      .then(newData => {
        setCurrentUser(newData);
        setLoading(false);
        closeAllPopups();
      })
      .catch(error => {
        handleMessagePopup(`Something went wrong - ${error}`);
        setMessageIcon(false);
        setLoading(false);
      });
  };

  function handleUpdateUser({userName, about}) {
    setLoading(true);

    api.setUserInfo(userName, about)
      .then(newData => {
        setCurrentUser(newData);
        setLoading(false);
        closeAllPopups();
      })
      .catch(error => {
        handleMessagePopup(`Something went wrong - ${error}`);
        setMessageIcon(false);
        setLoading(false);
      });
  };
  /* /user info */


  /* popup's */
  const handleEditAvatarClick =()=> {
    setIsEditAvatarPopupOpen(true);
    setResetForms(false);
  };

  const handleEditProfileClick =()=> {
    setIsEditProfilePopupOpen(true);
    setResetForms(false);
  };

  const handleAddPlaceClick =()=> {
    setIsAddPlacePopupOpen(true);
    setResetForms(false);
  };

  const handleMessagePopup =(message)=> {
    setIsMessagePopup(true);
    setMessageText(message);

    const hideMessage =()=> {
      setIsMessagePopup(false);
    }

    setTimeout(hideMessage, 1500);
  }

  const handleCardClick =(name, link)=> {
    setSelectedCard({
      isOpen: true,
      name,
      link
    });
  };

  const closeAllPopups =()=> {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);

    setSelectedCard({});
    setLoading(false);
    setResetForms(true);
    setMessageText('');
  };
  /* /popup's */


  /* token verification */
  useEffect(()=> {
    if(localStorage.getItem('jwt')) {

      const jwt = localStorage.getItem('jwt');
      
        auth.getContent(jwt)
          .then(({data}) => {
            setUserEmail(data.email);
            setLoggedIn(true);
            history.push('/');
          })
          .catch(errorMessage => console.log(errorMessage));
    }
  }, [history]);
  /* /token verification */


  /* Auth */
  const authData = {
    email,
    password,
    emailError,
    passwordError,
    authDirty,
    validForm,
    handleChangeEmail,
    handleChangePassword,
    blurHandler
  };

  function handleSubmitLogin() {
    setIsLoadingMessage(true);

      auth.authorize(email, password)
      .then(({token}) => {
        if(token) {
          localStorage.setItem('jwt', token);
          setUserEmail(email);
          setIsLoadingMessage(false);
          setLoggedIn(true);
          history.push('/');
          return token;
        }
      }
    )
    .catch(errorMessage => {
      setIsInfoTooltipIcon(false);
      setIsLoadingMessage(false);
      setIsInfoTooltip(true);
      setMessageText(errorMessage);
    });
  }

  function handleSubmitRegister() {
      auth.register(email, password)
      .then(({data}) => {
        if(data) {
          setUserEmail(data.email);
          setIsInfoTooltipIcon(true);
          setMessageText('Вы успешно зарегистрировались!');
          setIsInfoTooltip(true);
          resetAuthForms();
          history.push('/signin');
        }
      })
      .catch(() => {
        setIsInfoTooltipIcon(false);
        setMessageText('Некорректно заполнено одно из полей!');
        setIsInfoTooltip(true);
      });
    };

  const signOut =()=> {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    resetAuthForms();
    setUserEmail('');
    history.push('/');
  }

  const handleChangeLoginPage =()=> {
    setLoginPage(false);
  }

  const resetAuthForms =()=> {
    setEmail('');
    setPassword('');
  }
  /* /Auth */


  /* helpers */
  const changeHeaderMenu =()=> {
    if(!visibleHeaderMenu && headerMenuBurger) {
      setVisibleHeaderMenu(true);
      setHeaderMenuBurger(false);
    } else {
      setVisibleHeaderMenu(false);
      setHeaderMenuBurger(true);
    }
  }
  /* /helpers */


  return (
    <SpinnerContext.Provider value={loading} >
      <CurrentUserContext.Provider value={currentUser} >
        <div className="body">
          <div className="page">

            <Header
              component={Loged}
              userEmail={userEmail}
              loggedIn={loggedIn}
              visibleHeaderMenu={visibleHeaderMenu}
              signOut={signOut}
              changeHeaderMenu={changeHeaderMenu}
              headerMenuBurger={headerMenuBurger}
              loginPage={loginPage}
              handleChangeLoginPage={handleChangeLoginPage} />

              <Switch>
                <Route path='/signin'>
                  <Login
                    authData={authData}
                    handleSubmitLogin={handleSubmitLogin}
                    setLoginPage={setLoginPage} />
                </Route>

                <Route path='/signup'>
                  <Register
                    authData={authData}
                    handleSubmitRegister={handleSubmitRegister} />
                </Route>

                <ProtectedRoute
                  exact
                  path="/"
                  component={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick} 
                  cards={cards}
                  cardsError={cardsError}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete} />

                <Route>
                  {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
                </Route>
              </Switch>

            <Footer />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              loading={loading}
              resetForms={resetForms} />
            
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              loading={loading}
              resetForms={resetForms} /> 

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              loading={loading}
              resetForms={resetForms} />

            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups} />

            <MessagePopup
              messageIcon={messageIcon}
              title={messageText}
              isOpen={isMessagePopup} />

            <LoadingMessage
              isOpen={isLoadingMessage} />

            <InfoTooltip
              isOpen={isInfoTooltip}
              onClose={closeAllPopups}
              isDone={isInfoTooltipStatus}
              messageText={messageText} />
            
          </div>
        </div>
      </CurrentUserContext.Provider>
    </SpinnerContext.Provider>
  );
};

export default App;