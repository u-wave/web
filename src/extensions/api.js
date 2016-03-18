import { applyTheme } from '../actions/SettingsActionCreators';
import { bindActionCreators } from 'redux';

export default function createApis({ dispatch }) {
  return bindActionCreators({
    applyTheme
  }, dispatch);
}
