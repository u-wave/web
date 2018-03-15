import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import OverlayHeader from '../Overlay/Header';
import SettingsPanel from './SettingsPanel';

const enhance = translate();

class SettingsManager extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    onCloseOverlay: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
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
      <div className={cx('SettingsManager', className)}>
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
      </div>
    );
  }
}

export default enhance(SettingsManager);
