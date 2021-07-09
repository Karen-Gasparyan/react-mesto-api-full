class Auth {
  constructor(url) {
    this.BASE_URL = url;
  }

  register =(email, password)=> {
    return fetch(`${this.BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.status === 400 ? Promise.reject() : res.json())
  }

  authorize =(email, password)=> {
    return fetch(`${this.BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => {
      if(res.status === 400) {
        return Promise.reject('Не передано одно из полей');
      } else if(res.status === 401) {
        return Promise.reject('Пользователь с email не найден');
      } else {
        return res.json();
      }
    })
  }

  getContent =(token)=> {
    return fetch(`${this.BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => {
      if(res.status === 400) {
        return Promise.reject('Токен не передан или передан не в том формате');
      } else if(res.status === 401) {
        return Promise.reject('Переданный токен некорректен');
      } else {
        return res.json();
      }
    })
  }
}

const auth = new Auth('https://auth.nomoreparties.co.');

export default auth;