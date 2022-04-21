import React from 'react';
import { createRoot } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { parse as parseQS } from 'querystring';
import thunk from 'redux-thunk';
import Translator from '@u-wave/translate';
import webApiRequest from '../redux/request';
import readApplicationConfig from '../utils/readApplicationConfig';
import * as reducers from './reducers';
import { setResetKey } from './actions';
import PasswordResetApp from './containers/PasswordResetApp';
import english from '../../locale/en.yaml';
import './app.css';

const config = readApplicationConfig();
const key = document.querySelector('#reset-data').textContent;

const store = createStore(
  combineReducers(reducers),
  { config },
  applyMiddleware(
    thunk,
    webApiRequest(),
  ),
);

const qs = parseQS(window.location.search.slice(1));
store.dispatch(setResetKey(key || qs.key));

const translator = new Translator(english.uwave);

const root = createRoot(document.querySelector('#app'));
root.render((
  <Provider store={store}>
    <PasswordResetApp translator={translator} />
  </Provider>
));
