import { configureStore } from '@reduxjs/toolkit';
import persistSettings from './persistSettings';
import webApiRequest from './request';
import webApiSocket from './socket';
import * as reducers from '../reducers';
import createSourcesReducer from '../reducers/createSourcesReducer';

function createUwaveStore(initialState = {}, options = {}) {
  const isTesting = typeof jest !== 'undefined';

  const store = configureStore({
    reducer: {
      ...reducers,
      sources: createSourcesReducer(options),
    },
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware();
      // This allows dispatching REQUEST_START actions to the store, which will
      // then be executed and handled as HTTP requests by the middleware.
      middleware.push(webApiRequest());
      if (!isTesting) {
        middleware.push(webApiSocket({ url: options.socketUrl }));
      }
      return middleware;
    },
    enhancers: [persistSettings],
    initialState,
  });

  return store;
}

/** @typedef {ReturnType<ReturnType<typeof createUwaveStore>['getState']>} StoreState */
/** @typedef {ReturnType<typeof createUwaveStore>['dispatch']} AppDispatch */

export default createUwaveStore;
