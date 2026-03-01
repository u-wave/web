import { useTranslator } from '@u-wave/react-translate';
import FormGroup from '@mui/material/FormGroup';
import { useSelector } from '../../hooks/useRedux';
import Switch from '../Switch';
import SettingControl from './SettingControl';

type NotificationSettingsProps = {
  onSettingChange: (name: string, value: boolean) => void,
};
function NotificationSettings({ onSettingChange }: NotificationSettingsProps) {
  const { t } = useTranslator();
  const notifications = useSelector((state) => state.settings.notifications);

  return (
    <div>
      <h2 className="SettingsPanel-header">{t('settings.notifications.title')}</h2>
      <p className="SettingsPanel-helpText">{t('settings.notifications.help')}</p>
      <FormGroup>
        <SettingControl label={t('settings.notifications.userJoin')}>
          <Switch
            checked={notifications.userJoin}
            onChange={(event) => {
              onSettingChange('notifications.userJoin', event.target.checked);
            }}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userLeave')}>
          <Switch
            checked={notifications.userLeave}
            onChange={(event) => {
              onSettingChange('notifications.userLeave', event.target.checked);
            }}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userNameChanged')}>
          <Switch
            checked={notifications.userNameChanged}
            onChange={(event) => {
              onSettingChange('notifications.userNameChanged', event.target.checked);
            }}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.skip')}>
          <Switch
            checked={notifications.skip}
            onChange={(event) => {
              onSettingChange('notifications.skip', event.target.checked);
            }}
          />
        </SettingControl>
      </FormGroup>
    </div>
  );
}

export default NotificationSettings;
