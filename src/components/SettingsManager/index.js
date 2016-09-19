import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';
import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

import SettingsPanel from './SettingsPanel';

class SettingsManager extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    onCloseOverlay: React.PropTypes.func.isRequired,
    onLogout: React.PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.onCloseOverlay();
    this.props.onLogout();
  };

  render() {
    const {
      t,
      className,
      onCloseOverlay,
      ...props
    } = this.props;

    return (
      <Overlay className={cx('SettingsManager', 'AppColumn', 'AppColumn--full', className)}>
        <OverlayHeader
          title={t('settings.title')}
          onCloseOverlay={onCloseOverlay}
        />
        <div className="SettingsManager-body AppRow AppRow--middle">
          <SettingsPanel
            {...props}
            onLogout={this.handleLogout}
          />
        </div>
      </Overlay>
    );
  }
}

export default translate()(SettingsManager);
