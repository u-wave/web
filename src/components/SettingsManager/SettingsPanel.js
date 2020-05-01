import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Profile from './Profile';
import SettingControl from './SettingControl';
import LanguagePicker from './LanguagePicker';
import LogoutButton from './LogoutButton';
import NotificationSettings from './NotificationSettings';
import Links from './Links';

function SettingsPanel({
  className,
  settings,
  user,
  onSettingChange,
  onChangeUsername,
  onChangeLanguage,
  onLogout,
}) {
  const { t } = useTranslator();

  const handleVideoEnabledChange = (event, value) => {
    onSettingChange('videoEnabled', value);
  };
  const handleVideoSizeChange = (event, value) => {
    onSettingChange('videoSize', value ? 'large' : 'small');
  };
  const handleMentionSoundChange = (event, value) => {
    onSettingChange('mentionSound', value);
  };
  const handleLanguageChange = (event) => {
    onChangeLanguage(event.target.value);
  };

  return (
    <div className={cx('SettingsPanel', className)}>
      {user && (
        <Profile
          user={user}
          onChangeUsername={onChangeUsername}
        />
      )}
      {user && <hr className="SettingsPanel-divider" />}
      <div className="SettingsPanel-column SettingsPanel-column--left">
        <h2 className="SettingsPanel-header">{t('settings.title')}</h2>
        <FormGroup>
          <SettingControl
            label={t('settings.videoEnabled')}
            helpText={t('settings.videoEnabledHelp')}
          >
            <Switch
              color="primary"
              checked={settings.videoEnabled}
              onChange={handleVideoEnabledChange}
            />
          </SettingControl>
          <SettingControl label={t('settings.videoSize')}>
            <Switch
              color="primary"
              checked={settings.videoSize === 'large'}
              onChange={handleVideoSizeChange}
            />
          </SettingControl>
          <SettingControl label={t('settings.mentionSound')}>
            <Switch
              color="primary"
              checked={settings.mentionSound}
              onChange={handleMentionSoundChange}
            />
          </SettingControl>
          <SettingControl label={t('settings.language')}>
            <LanguagePicker
              value={settings.language}
              onChange={handleLanguageChange}
            />
          </SettingControl>
        </FormGroup>
        <hr className="SettingsPanel-divider" />
        <Links />
        {user && (
          <>
            <hr className="SettingsPanel-divider" />
            <LogoutButton onLogout={onLogout} />
          </>
        )}
      </div>
      <div className="SettingsPanel-column SettingsPanel-column--right">
        <NotificationSettings
          settings={settings}
          onSettingChange={onSettingChange}
        />
        <hr className="SettingsPanel-divider" />
      </div>
    </div>
  );
}

SettingsPanel.propTypes = {
  className: PropTypes.string,
  settings: PropTypes.object.isRequired,
  user: PropTypes.object,
  onSettingChange: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default SettingsPanel;
