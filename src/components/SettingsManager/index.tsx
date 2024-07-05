import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import SettingsPanel, { type SettingsPanelProps } from './SettingsPanel';

type SettingsManagerProps = SettingsPanelProps & {
  onCloseOverlay: () => void,
};
function SettingsManager({
  className = undefined,
  onCloseOverlay,
  onLogout,
  ...props
}: SettingsManagerProps) {
  const { t } = useTranslator();
  const handleLogout = () => {
    onCloseOverlay();
    return onLogout();
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

export default SettingsManager;
