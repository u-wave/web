import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { TICK } from '../constants/actionTypes/time';

import * as reducers from '../reducers';

export default function createUwaveStore() {
  const middleware = [
    thunk,
    logger({
      // avoid log spam
      predicate: (getState, action) => action.type !== TICK
    })
  ];

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
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
