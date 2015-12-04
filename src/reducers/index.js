import { combineReducers } from 'redux';

import activeOverlay from './activeOverlay';
import selectedPanel from './selectedPanel';

export default combineReducers({
  activeOverlay,
  selectedPanel
});
