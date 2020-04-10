import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Profile from './Profile';
import SettingControl from './SettingControl';
import LanguagePicker from './LanguagePicker';
import LogoutButton from './LogoutButton';
import NotificationSettings from './NotificationSettings';
import Links from './Links';

const enhance = translate();

class SettingsPanel extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
    user: PropTypes.object,
    onSettingChange: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    onChangeLanguage: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  handleVideoEnabledChange = (e, value) => {
    const { onSettingChange } = this.props;
    onSettingChange('videoEnabled', value);
  };

  handleVideoSizeChange = (e, value) => {
    const { onSettingChange } = this.props;
    onSettingChange('videoSize', value ? 'large' : 'small');
  };

  handleMentionSoundChange = (e, value) => {
    const { onSettingChange } = this.props;
    onSettingChange('mentionSound', value);
  };

  handleLanguageChange = (event) => {
    const { onChangeLanguage } = this.props;
    onChangeLanguage(event.target.value);
  };

  render() {
    const {
      t,
      className,
      settings,
      user,
      onSettingChange,
      onChangeUsername,
      onLogout,
    } = this.props;

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
                onChange={this.handleVideoEnabledChange}
              />
            </SettingControl>
            <SettingControl label={t('settings.videoSize')}>
              <Switch
                color="primary"
                checked={settings.videoSize === 'large'}
                onChange={this.handleVideoSizeChange}
              />
            </SettingControl>
            <SettingControl label={t('settings.mentionSound')}>
              <Switch
                color="primary"
                checked={settings.mentionSound}
                onChange={this.handleMentionSoundChange}
              />
            </SettingControl>
            <SettingControl label={t('settings.language')}>
              <LanguagePicker
                value={settings.language}
                onChange={this.handleLanguageChange}
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
}

export default enhance(SettingsPanel);
