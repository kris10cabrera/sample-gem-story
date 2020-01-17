import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './state';


ReactDOM.render(
  // Redux Provider component allows us to propagate our state down 
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
