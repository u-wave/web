import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Switch from '@material-ui/core/Switch';
import LabeledControl from './LabeledControl';

const { useCallback } = React;

function NotificationSettings({ settings, onSettingChange }) {
  const { t } = useTranslator();

  function useToggleSetting(name) {
    return useCallback((e, value) => {
      onSettingChange(name, value);
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
      <LabeledControl label={t('settings.notifications.userJoin')} id="uw-setting-userjoin">
        <Switch
          color="primary"
          checked={settings.notifications.userJoin}
          onChange={onToggleUserJoin}
        />
      </LabeledControl>
      <LabeledControl label={t('settings.notifications.userLeave')} id="uw-setting-userleave">
        <Switch
          color="primary"
          checked={settings.notifications.userLeave}
          onChange={onToggleUserLeave}
        />
      </LabeledControl>
      <LabeledControl label={t('settings.notifications.userNameChanged')} id="uw-setting-usernamechanged">
        <Switch
          color="primary"
          checked={settings.notifications.userNameChanged}
          onChange={onToggleUserNameChanged}
        />
      </LabeledControl>
      <LabeledControl label={t('settings.notifications.skip')} id="uw-setting-skip">
        <Switch
          color="primary"
          checked={settings.notifications.skip}
          onChange={onToggleSkip}
        />
      </LabeledControl>
    </div>
  );
}

NotificationSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onSettingChange: PropTypes.func.isRequired,
};

export default NotificationSettings;
