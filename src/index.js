// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Our Dependencies

import App from './components';
import store from './store';

//Render the provider object
//Render the App 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);