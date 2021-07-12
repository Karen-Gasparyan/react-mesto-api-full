import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './components/App';


ReactDOM.render(
  <React.StrictMode>
    <Favicon url='https://img.icons8.com/emoji/48/000000/russia-emoji.png' />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);