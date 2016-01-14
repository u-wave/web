# üWave Web Client Source Code

Welcome to the üWave web client source files!

The üWave web client is a [React](https://facebook.github.io/react) app. All
React components can be found in the [components/](./components/) folder.

The web client uses [Redux](http://redux.js.org) to manage state (users,
playlists, chat, and everything else). See the [Redux website](http://redux.js.org/index.html),
particularly the ["Basics" chapter of the documentation](http://redux.js.org/docs/basics/index.html),
for more.

The Redux action descriptions are created by the functions in the
[actions/](./actions/) folder. The action type names are defined in the
[constants/actionTypes/](./constants/actionTypes/) folder.

The Redux reducer functions can be found in the [reducers/](./reducers/) folder.
The Redux store creator and custom store enhancers are in the [store/](./store/)
directory. Data can be extracted from the Redux store state (by components, or
action creators) using selector functions. Selector functions exist in the
[selectors/](./selectors/) directory.

Most React components just render what their parent tells them to render, but
some do have to interact with the global state. These components are called
Container components, and they live in the [containers/](./containers/) folder.

The üWave web client is "started" by the [app.js](./app.js) file in this folder.

## Middleware

An [Express middleware](./middleware.js) is also included so that you can run
the üWave web client next to other code using Express. For example, the
middleware can be used to [serve the client and an üWave API server](../tasks/serve.js)
from the same place.
