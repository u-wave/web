import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Profile from './Profile';
import LabeledControl from './LabeledControl';
import LanguagePicker from './LanguagePicker';
import LogoutButton from './LogoutButton';
import NotificationSettings from './NotificationSettings';
import Links from './Links';
import Toggle from './Toggle';

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
    onLogout: PropTypes.func.isRequired
  };

  handleVideoEnabledChange = (e, value) => {
    this.props.onSettingChange('videoEnabled', value);
  };

  handleVideoSizeChange = (e, value) => {
    this.props.onSettingChange('videoSize', value ? 'large' : 'small');
  };

  handleMentionSoundChange = (e, value) => {
    this.props.onSettingChange('mentionSound', value);
  };

  handleLanguageChange = (e, index, value) => {
    this.props.onChangeLanguage(value);
  };

  render() {
    const {
      t,
      className,
      settings,
      user,
      onChangeUsername,
      onLogout
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
          <Toggle
            label={t('settings.videoEnabled')}
            toggled={settings.videoEnabled}
            onToggle={this.handleVideoEnabledChange}
          />
          <Toggle
            label={t('settings.videoSize')}
            toggled={settings.videoSize === 'large'}
            onToggle={this.handleVideoSizeChange}
          />
          <Toggle
            label={t('settings.mentionSound')}
            toggled={settings.mentionSound}
            onToggle={this.handleMentionSoundChange}
          />
          <div className="SettingsPanel-toggle">
            <LabeledControl id="uw-setting-language" label={t('settings.language')}>
              <LanguagePicker
                id="uw-setting-language"
                value={settings.language}
                onChange={this.handleLanguageChange}
              />
            </LabeledControl>
          </div>
          <LogoutButton onLogout={onLogout} />
        </div>
        <div className="SettingsPanel-column SettingsPanel-column--right">
          <NotificationSettings
            settings={settings}
            onSettingChange={this.props.onSettingChange}
          />
          <hr className="SettingsPanel-divider" />
          <Links />
        </div>
      </div>
    );
  }
}

export default enhance(SettingsPanel);
