import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

import SettingsPanel from './SettingsPanel';

export default class SettingsManager extends Component {
  static propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
    user: PropTypes.object,

    onCloseOverlay: PropTypes.func.isRequired,
    onSettingChange: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  onLogout = () => {
    this.props.onCloseOverlay();
    this.props.onLogout();
  };

  render() {
    const {
      className, settings, user,
      onCloseOverlay, onSettingChange, onChangeUsername
    } = this.props;
    return (
      <Overlay className={cx('SettingsManager', 'AppColumn', 'AppColumn--full', className)}>
        <OverlayHeader
          title="Settings"
          onCloseOverlay={onCloseOverlay}
        />
        <div className="SettingsManager-body AppRow AppRow--middle">
          <SettingsPanel
            user={user}
            settings={settings}
            onChangeUsername={onChangeUsername}
            onSettingChange={onSettingChange}
            onLogout={this.onLogout}
          />
        </div>
      </Overlay>
    );
  }
}
