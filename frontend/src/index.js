import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' })

ReactDOM.render(
  <App />,
  document.getElementById('root')
);