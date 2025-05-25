import { useTranslator } from '@u-wave/react-translate';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useSelector } from '../../hooks/useRedux';
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
            color="primary"
            checked={notifications.userJoin}
            onChange={(_event, checked) => {
              onSettingChange('notifications.userJoin', checked);
            }}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userLeave')}>
          <Switch
            color="primary"
            checked={notifications.userLeave}
            onChange={(_event, checked) => {
              onSettingChange('notifications.userLeave', checked);
            }}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userNameChanged')}>
          <Switch
            color="primary"
            checked={notifications.userNameChanged}
            onChange={(_event, checked) => {
              onSettingChange('notifications.userNameChanged', checked);
            }}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.skip')}>
          <Switch
            color="primary"
            checked={notifications.skip}
            onChange={(_event, checked) => {
              onSettingChange('notifications.skip', checked);
            }}
          />
        </SettingControl>
      </FormGroup>
    </div>
  );
}

export default NotificationSettings;
