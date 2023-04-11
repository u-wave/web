import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistSettings from './persistSettings';
import webApiRequest from './request';
import webApiSocket from './socket';
import webApiSocketHandler from './socketHandler';
import * as reducers from '../reducers';
import createSourcesReducer from '../reducers/createSourcesReducer';

const reducer = combineReducers(reducers);

function createUwaveStore(preloadedState = {}, options = {}) {
  const store = configureStore({
    reducer: {
      ...reducers,
      sources: createSourcesReducer(options),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      // This allows dispatching REQUEST_START actions to the store, which will
      // then be executed and handled as HTTP requests by the middleware.
      webApiRequest(),
      webApiSocket({ url: options.socketUrl }),
      webApiSocketHandler.middleware,
    ),
    enhancers: [persistSettings],
    preloadedState,
  });

  return store;
}

/** @typedef {ReturnType<typeof reducer>} StoreState */
/** @typedef {import('redux').Dispatch & import('@reduxjs/toolkit').ThunkDispatch<StoreState, void>} AppDispatch */

export default createUwaveStore;
