import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import persistSettings from './persistSettings';
import webApiRequest from './request';
import webApiSocket from './socket';
import * as reducers from '../reducers';
import createSourcesReducer from '../reducers/createSourcesReducer';

// Setting up a store in Redux can be kind of messy because there are a lot of
// things coming together in one place. Luckily, we don't have _that_ much going
// on in üWave, so it's kind of manageable.

function createUwaveStore(initialState = {}, options = {}) {
  const isTesting = typeof jest !== 'undefined';

  const middleware = [
    // Redux-Thunk allows dispatching a function to the store instead of an
    // action object. These functions can then dispatch action objects as they
    // please. It's used primarily for async actions: for example, actions that
    // send HTTP requests. Those might dispatch an action object once the
    // request finishes.
    thunk,
    // This allows dispatching REQUEST_START actions to the store, which will
    // then be executed and handled as HTTP requests by the middleware.
    webApiRequest(),
    !isTesting && webApiSocket({ url: options.socketUrl }),
  ].filter(Boolean);

  const store = createStore(
    // Finish up the reducer function by combining all the different reducers
    // into one big reducer that works on one big state object.
    combineReducers({
      ...reducers,
      sources: createSourcesReducer(options),
    }),
    initialState,
    compose(
      // Adds all of the above ☝ middleware features to the store.
      applyMiddleware(...middleware),
      // Keeps the user's settings in localStorage, so that a refresh doesn't
      // reset all your preferences.
      // This is done separately from the Middleware features, because it changes
      // the _initial_ `settings` state, something that Middleware can't do.
      persistSettings,
    ),
  );

  if (import.meta.hot) {
    // Update the store's reducer function when the reducer source code has changed.
    import.meta.hot.accept('../reducers/index.js', () => {
      store.replaceReducer(combineReducers({
        ...reducers,
        sources: createSourcesReducer(options),
      }));
    });
  }

  return store;
}

export default createUwaveStore;
