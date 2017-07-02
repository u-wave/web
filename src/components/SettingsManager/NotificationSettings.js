import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
import Toggle from './Toggle';

const enhance = compose(
  withProps(props => ({
    onToggleUserJoin(e, value) {
      props.onSettingChange('notifications.userJoin', value);
    },
    onToggleUserLeave(e, value) {
      props.onSettingChange('notifications.userLeave', value);
    },
    onToggleUserNameChanged(e, value) {
      props.onSettingChange('notifications.userNameChanged', value);
    }
  })),
  translate()
);

const NotificationSettings = ({
  t,
  settings,
  onToggleUserJoin,
  onToggleUserLeave,
  onToggleUserNameChanged
}) => (
  <div>
    <h2 className="SettingsPanel-header">{t('settings.notifications.title')}</h2>
    <p className="SettingsPanel-helpText">{t('settings.notifications.help')}</p>
    <Toggle
      label={t('settings.notifications.userJoin')}
      labelPosition="left"
      toggled={settings.notifications.userJoin}
      onToggle={onToggleUserJoin}
    />
    <Toggle
      label={t('settings.notifications.userLeave')}
      labelPosition="left"
      toggled={settings.notifications.userLeave}
      onToggle={onToggleUserLeave}
    />
    <Toggle
      label={t('settings.notifications.userNameChanged')}
      labelPosition="left"
      toggled={settings.notifications.userNameChanged}
      onToggle={onToggleUserNameChanged}
    />
  </div>
);

NotificationSettings.propTypes = {
  t: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  onSettingChange: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  onToggleUserJoin: PropTypes.func.isRequired,
  onToggleUserLeave: PropTypes.func.isRequired,
  onToggleUserNameChanged: PropTypes.func.isRequired
};

export default enhance(NotificationSettings);
