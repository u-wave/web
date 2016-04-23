import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from '../../src/containers/App';
import configureStore from '../../src/store/configureStore';

// Renders the React app to a string. It's surprisingly straightforward because
// React is cool.
export default function renderApp() {
  const store = configureStore();
  return renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
