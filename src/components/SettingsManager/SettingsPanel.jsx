import cx from 'clsx';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Profile from './Profile';
import SettingControl from './SettingControl';
import LanguagePicker from './LanguagePicker';
import LogoutButton from './LogoutButton';
import NotificationSettings from './NotificationSettings';
import Links from './Links';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import {
  languageSelector,
  mentionSoundEnabledSelector,
  videoEnabledSelector,
  videoSizeSelector,
  setVideoEnabled,
  setVideoSize,
  setMentionSoundEnabled,
  setLanguage,
} from '../../reducers/settings';
import useCurrentUser from '../../hooks/useCurrentUser';

function SettingsPanel({
  className,
  onChangeUsername,
  onLogout,
}) {
  const { t } = useTranslator();
  const isWide = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const user = useCurrentUser();
  const dispatch = useDispatch();
  const videoEnabled = useSelector(videoEnabledSelector);
  const videoSize = useSelector(videoSizeSelector);
  const mentionSoundEnabled = useSelector(mentionSoundEnabledSelector);
  const language = useSelector(languageSelector);

  const handleVideoEnabledChange = (event) => {
    dispatch(setVideoEnabled(event.target.checked));
  };
  const handleVideoSizeChange = (event) => {
    dispatch(setVideoSize(event.target.checked ? 'large' : 'small'));
  };
  const handleMentionSoundChange = (event) => {
    dispatch(setMentionSoundEnabled(event.target.checked));
  };
  const handleLanguageChange = (event) => {
    dispatch(setLanguage(event.target.value));
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
            checked={videoEnabled}
            onChange={handleVideoEnabledChange}
          />
        </SettingControl>
        <SettingControl label={t('settings.videoSize')}>
          <Switch
            color="primary"
            checked={videoSize === 'large'}
            onChange={handleVideoSizeChange}
          />
        </SettingControl>
        <SettingControl label={t('settings.mentionSound')}>
          <Switch
            color="primary"
            checked={mentionSoundEnabled}
            onChange={handleMentionSoundChange}
          />
        </SettingControl>
        <SettingControl label={t('settings.language')}>
          <LanguagePicker
            value={language}
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
      <NotificationSettings />
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
  onChangeUsername: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default SettingsPanel;
