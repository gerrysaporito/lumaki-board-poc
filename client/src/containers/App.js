import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import{ configureStore } from '../store';
import jwtDecode from 'jwt-decode';

import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import { setProfile } from '../store/actions/profiles';

import Main from './Main';

import './css/App.css';

const store = configureStore();

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    store.dispatch(setProfile(jwtDecode(localStorage.jwtToken).profile));
  } catch(err) {
    store.dispatch(setCurrentUser());
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='app'>
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
