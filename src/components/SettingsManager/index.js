import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import OverlayHeader from '../Overlay/Header';

export default class SettingsManager extends Component {
  static propTypes = {
    className: PropTypes.string,

    onCloseOverlay: PropTypes.func,
    onSettingChange: PropTypes.func
  };

  render() {
    const { className, onCloseOverlay } = this.props;
    return (
      <div className={cx('SettingsManager', 'AppColumn', 'AppColumn--full', className)}>
        <OverlayHeader
          title="Settings"
          onCloseOverlay={onCloseOverlay}
        />
        <div className="SettingsManager-body AppRow AppRow--middle">
          [Placeholder]
        </div>
      </div>
    );
  }
}
