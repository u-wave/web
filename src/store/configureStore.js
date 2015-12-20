import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { TICK } from '../constants/actionTypes/time';

import persistSettings from './persistSettings';
import * as reducers from '../reducers';

export default function createUwaveStore() {
  const middleware = [
    thunk,
    logger({
      // avoid log spam
      predicate: (getState, action) => action.type !== TICK
    })
  ];

  const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    persistSettings
  )(createStore);
  const store = createStoreWithMiddleware(
    combineReducers(reducers)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(combineReducers(
        require('../reducers')
      ));
    });
  }

  return store;
}
