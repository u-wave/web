import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  const isWide = useMediaQuery((theme) => theme.breakpoints.up('lg'));

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

  const profileSection = user && (
    <div key="profile" className="SettingsPanel-section SettingsPanel-user">
      <Profile user={user} onChangeUsername={onChangeUsername} />
    </div>
  );

  const settingsSection = (
    <div key="settings" className="SettingsPanel-section SettingsPanel-settings">
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
    </div>
  );

  const linksSection = (
    <div key="links" className="SettingsPanel-section SettingsPanel-links">
      <Links />
    </div>
  );

  const signoutSection = user && (
    <div key="signout" className="SettingsPanel-section SettingsPanel-signout">
      <LogoutButton onLogout={onLogout} />
    </div>
  );

  const notificationsSection = (
    <div key="notifications" className="SettingsPanel-section SettingsPanel-notificationSettings">
      <NotificationSettings settings={settings} onSettingChange={onSettingChange} />
    </div>
  );

  return (
    <div className={cx('SettingsPanel', isWide && 'is-wide', className)}>
      {isWide ? (
        // On wider screens, use two columns
        <>
          {profileSection}
          <div className="SettingsPanel-column SettingsPanel-column--left">
            {settingsSection}
            {linksSection}
            {signoutSection}
          </div>
          <div className="SettingsPanel-column SettingsPanel-column--right">
            {notificationsSection}
          </div>
        </>
      ) : (
        // On narrower screens, use a single-column layout
        <>
          {profileSection}
          {settingsSection}
          {notificationsSection}
          {linksSection}
          {signoutSection}
        </>
      )}
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
