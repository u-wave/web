import { useCallback } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import SettingControl from './SettingControl';
import { useSelector } from '../../hooks/useRedux';

type NotificationSettingsProps = {
  onSettingChange: (name: string, value: boolean) => void,
};
function NotificationSettings({ onSettingChange }: NotificationSettingsProps) {
  const { t } = useTranslator();
  const notifications = useSelector((state) => state.settings.notifications);

  function useToggleSetting(name: string) {
    return useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      onSettingChange(name, event.target.checked);
      // `name` is a constant.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSettingChange]);
  }

  const onToggleUserJoin = useToggleSetting('notifications.userJoin');
  const onToggleUserLeave = useToggleSetting('notifications.userLeave');
  const onToggleUserNameChanged = useToggleSetting('notifications.userNameChanged');
  const onToggleSkip = useToggleSetting('notifications.skip');

  return (
    <div>
      <h2 className="SettingsPanel-header">{t('settings.notifications.title')}</h2>
      <p className="SettingsPanel-helpText">{t('settings.notifications.help')}</p>
      <FormGroup>
        <SettingControl label={t('settings.notifications.userJoin')}>
          <Switch
            color="primary"
            checked={notifications.userJoin}
            onChange={onToggleUserJoin}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userLeave')}>
          <Switch
            color="primary"
            checked={notifications.userLeave}
            onChange={onToggleUserLeave}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userNameChanged')}>
          <Switch
            color="primary"
            checked={notifications.userNameChanged}
            onChange={onToggleUserNameChanged}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.skip')}>
          <Switch
            color="primary"
            checked={notifications.skip}
            onChange={onToggleSkip}
          />
        </SettingControl>
      </FormGroup>
    </div>
  );
}

export default NotificationSettings;
