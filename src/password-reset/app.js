import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { parse as parseQS } from 'querystring';
import thunk from 'redux-thunk';
import { AppContainer as HotContainer } from 'react-hot-loader';
import createLocale from '../locale';
import webApiRequest from '../store/request';
import * as reducers from './reducers';
import { setResetKey } from './actions';
import App from './containers/PasswordResetApp';

import './app.css';

const config = document.querySelector('#u-wave-config').textContent;
const key = document.querySelector('#reset-data').textContent;

const store = createStore(
  combineReducers(reducers),
  { config },
  applyMiddleware(
    thunk,
    webApiRequest()
  ),
);

const qs = parseQS(location.search.slice(1));
store.dispatch(setResetKey(key || qs.key));

createLocale('en').then((locale) => {
  ReactDOM.render((
    <HotContainer>
      <Provider store={store}>
        <App locale={locale} />
      </Provider>
    </HotContainer>
  ), document.querySelector('#app'));
});
