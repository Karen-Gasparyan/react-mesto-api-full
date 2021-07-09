class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };

  /* GET */
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  };

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  };
  /* /GET */


  /* SET */
  setUserAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: link })
    })
    .then(this._checkResponse)
  };

  setUserInfo(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
    .then(this._checkResponse)
  };

  setNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  };

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({ _id: id })
    })
    .then(this._checkResponse)
  };

  changeLike(id, isLiked) {
    if(isLiked) {
      return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({ _id: id })
    })
      .then(this._checkResponse)
    } else {
        return fetch(`${this._url}cards/likes/${id}`, {
          method: 'DELETE',
          headers: this._headers,
          body: JSON.stringify({ _id: id })
        })
          .then(this._checkResponse)
    }
  }
  /* /SET */
};

// const api = new Api({
//   url: 'http://api.yp.gks.mesto.nomoredomains.monster/',
//   headers: {
//     authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU1OWMyM2ZjZGExMzIxYzllODRjNjEiLCJpYXQiOjE2MjU4MDU5MjUsImV4cCI6MTYyNjQxMDcyNX0.XkZqhYcpfne2NXs5r65gmXfokrdTROc7a6P8b5NTz-8',
//     'Content-Type': 'application/json; charset=UTF-8'
//   }
// });

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-22/',
  headers: {
    authorization: 'fc55fa6a-67b0-4119-9d98-e2f765087414',
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

export default api;