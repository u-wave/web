import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import SettingControl from './SettingControl';

const { useCallback } = React;

function NotificationSettings({ settings, onSettingChange }) {
  const { t } = useTranslator();

  function useToggleSetting(name) {
    return useCallback((e, value) => {
      onSettingChange(name, value);
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
            checked={settings.notifications.userJoin}
            onChange={onToggleUserJoin}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userLeave')}>
          <Switch
            color="primary"
            checked={settings.notifications.userLeave}
            onChange={onToggleUserLeave}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.userNameChanged')}>
          <Switch
            color="primary"
            checked={settings.notifications.userNameChanged}
            onChange={onToggleUserNameChanged}
          />
        </SettingControl>
        <SettingControl label={t('settings.notifications.skip')}>
          <Switch
            color="primary"
            checked={settings.notifications.skip}
            onChange={onToggleSkip}
          />
        </SettingControl>
      </FormGroup>
    </div>
  );
}

NotificationSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onSettingChange: PropTypes.func.isRequired,
};

export default NotificationSettings;
