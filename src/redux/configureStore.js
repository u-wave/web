import { configureStore } from '@reduxjs/toolkit';
import persistSettings from './persistSettings';
import webApiRequest from './request';
import webApiSocket from './socket';
import webApiSocketHandler from './socketHandler';
import * as reducers from '../reducers';
import createSourcesReducer from '../reducers/createSourcesReducer';

function createUwaveStore(initialState = {}, options = {}) {
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
    initialState,
  });

  return store;
}

/** @typedef {ReturnType<ReturnType<typeof createUwaveStore>['getState']>} StoreState */
/** @typedef {ReturnType<typeof createUwaveStore>['dispatch']} AppDispatch */

export default createUwaveStore;
