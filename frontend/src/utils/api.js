class Api {
  constructor(url) {
    this._BASE_URL = url;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };

  _headerHeandler(token) {
    return {
      "Authorization" : `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8"
    };
  }

  /* GET */
  getInitialCards(token) {
    return fetch(`${this._BASE_URL}cards`, {
      method: 'GET',
      headers: this._headerHeandler(token)
    })
    .then(this._checkResponse)
  };

  getUserInfo(token) {
    return fetch(`${this._BASE_URL}users/me`, {
      method: 'GET',
      headers: this._headerHeandler(token)
    })
    .then(this._checkResponse)
  };
  /* /GET */

  /* SET */
  setUserAvatar(token, link) {
    return fetch(`${this._BASE_URL}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headerHeandler(token),
      body: JSON.stringify({ avatar: link })
    })
    .then(this._checkResponse)
  };

  setUserInfo(token, name, about) {
    return fetch(`${this._BASE_URL}users/me`, {
      method: 'PATCH',
      headers: this._headerHeandler(token),
      body: JSON.stringify({ name, about })
    })
    .then(this._checkResponse)
  };

  setNewCard(token, data) {
    return fetch(`${this._BASE_URL}cards`, {
      method: 'POST',
      headers: this._headerHeandler(token),
      body: JSON.stringify(data)
    })
    .then(this._checkResponse)
  };

  deleteCard(token, id) {
    return fetch(`${this._BASE_URL}cards/${id}`, {
      method: 'DELETE',
      headers: this._headerHeandler(token),
      body: JSON.stringify({ _id: id })
    })
    .then(this._checkResponse)
  };

  changeLike(token, id, isLiked) {
    if(isLiked) {
      return fetch(`${this._BASE_URL}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headerHeandler(token)
    })
      .then(this._checkResponse)
    } else {
        return fetch(`${this._BASE_URL}cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headerHeandler(token)
        })
          .then(this._checkResponse)
    }
  }
  /* /SET */
};

const api = new Api('http://localhost:5000/');
// http://localhost:5000/
// https://api.yp.gks.mesto.nomoredomains.monster/
export default api;