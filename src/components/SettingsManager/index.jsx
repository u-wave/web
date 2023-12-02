import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import SettingsPanel from './SettingsPanel';

function SettingsManager({
  className = null,
  onCloseOverlay,
  onLogout,
  ...props
}) {
  const { t } = useTranslator();
  const handleLogout = () => {
    onCloseOverlay();
    onLogout();
  };

  return (
    <div className={cx('SettingsManager', className)}>
      <OverlayHeader
        title={t('settings.title')}
        onCloseOverlay={onCloseOverlay}
      />
      <OverlayContent className="SettingsManager-body">
        <SettingsPanel
          {...props}
          onLogout={handleLogout}
        />
      </OverlayContent>
    </div>
  );
}

SettingsManager.propTypes = {
  className: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default SettingsManager;
