import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistSettings from './persistSettings';
import webApiSocket from './socket';
import webApiSocketHandler from './socketHandler';
import * as reducers from '../reducers';
import youtubeSourceReducer from '../sources/youtube/reducer';

const reducer = combineReducers({
  ...reducers,
  mediaSources: combineReducers({
    youtube: youtubeSourceReducer,
  }),
});

function createUwaveStore(preloadedState = {}, options = {}) {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      webApiSocket({ url: options.socketUrl }),
      webApiSocketHandler.middleware,
    ),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(persistSettings),
    preloadedState,
  });

  return store;
}

/** @typedef {ReturnType<typeof reducer>} StoreState */
/** @typedef {import('redux').Dispatch &
 *     import('@reduxjs/toolkit').ThunkDispatch<StoreState, void>} AppDispatch */

export default createUwaveStore;
