import { combineReducers } from 'redux';

import users from './users';
import view from './view';

export default combineReducers({
  users,
  view
});
