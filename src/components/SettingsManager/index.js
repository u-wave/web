import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import OverlayHeader from '../Overlay/Header';

import SettingsPanel from './SettingsPanel';

export default class SettingsManager extends Component {
  static propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
    user: PropTypes.object,

    onCloseOverlay: PropTypes.func.isRequired,
    onSettingChange: PropTypes.func.isRequired
  };

  render() {
    const { className, settings, user, onCloseOverlay, onSettingChange } = this.props;
    return (
      <div className={cx('SettingsManager', 'AppColumn', 'AppColumn--full', className)}>
        <OverlayHeader
          title="Settings"
          onCloseOverlay={onCloseOverlay}
        />
        <div className="SettingsManager-body AppRow AppRow--middle">
          <SettingsPanel
            user={user}
            settings={settings}
            onSettingChange={onSettingChange}
          />
        </div>
      </div>
    );
  }
}
