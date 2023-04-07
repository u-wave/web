import { bindActionCreators } from 'redux';
import { apply as debugApplyTheme, reset as debugResetTheme } from './reducers/theme';

export default function experimentalThemePlugin(instance) {
  // `.store` will not yet be available when this is .use()d.
  function dispatchProxy(...args) {
    return instance.store.dispatch(...args);
  }

  Object.assign(instance, bindActionCreators({
    debugApplyTheme,
    debugResetTheme,
  }, dispatchProxy));
}
