import { bindActionCreators } from 'redux';
import { apply as debugApplyTheme, reset as debugResetTheme } from './reducers/theme';
import type Uwave from './Uwave';

export default function experimentalThemePlugin(instance: Uwave) {
  // `.store` will not yet be available when this is .use()d.
  function dispatchProxy(args: any) {
    return instance.store!.dispatch(args);
  }

  Object.assign(instance, bindActionCreators({
    debugApplyTheme,
    debugResetTheme,
  }, dispatchProxy));
}
