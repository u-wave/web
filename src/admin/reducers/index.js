import { combineReducers } from 'redux';
import bans from './bans';
import view from './view';

export default combineReducers({ bans, view });
