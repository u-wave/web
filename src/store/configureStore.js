import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import persistSettings from './persistSettings';
import webApiRequest from './request';
import webApiSocket from './socket';
import * as reducers from '../reducers';
import createSourcesReducer from '../reducers/createSourcesReducer';

// Setting up a store in Redux can be kind of messy because there are a lot of
// things coming together in one place. Luckily, we don't have _that_ much going
// on in üWave, so it's kind of manageable.

export default function createUwaveStore(initialState = {}, options = {}) {
  const isTesting = process.env.NODE_ENV === 'testing';
  const enableLogging = process.env.NODE_ENV !== 'production' && !isTesting;

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
    !isTesting && webApiSocket(),
    // Redux-Logger logs state changes to the console, including the
    // Before-state, the Action object, and the After-state. Invaluable for
    // debugging :)
    enableLogging && createLogger()
  ].filter(Boolean);

  const store = createStore(
    // Finish up the reducer function by combining all the different reducers
    // into one big reducer that works on one big state object.
    combineReducers({
      ...reducers,
      sources: createSourcesReducer(options)
    }),
    initialState,
    compose(
      // Adds all of the above ☝ middleware features to the store.
      applyMiddleware(...middleware),
      // Keeps the user's settings in localStorage, so that a refresh doesn't
      // reset all your preferences.
      // This is done separately from the Middleware features, because it changes
      // the _initial_ `settings` state, something that Middleware can't do.
      persistSettings
    )
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    // Update the store's reducer function when the reducer source code has
    // changed. See /tasks/watch.js for more on Hot Reloading!
    // This is only used when debugging, not in a deployed app.
    module.hot.accept('../reducers', () => {
      store.replaceReducer(combineReducers({
        ...reducers,
        sources: createSourcesReducer(options)
      }));
    });
  }

  return store;
}
