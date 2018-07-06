import { combineReducers } from 'redux';

import users from './users';
import bans from './bans';
import config from './config';
import view from './view';

export default combineReducers({
  users,
  bans,
  config,
  view,
});
