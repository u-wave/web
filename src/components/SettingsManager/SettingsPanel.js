import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { FormGroup } from 'material-ui-next/Form'; // eslint-disable-line
import Switch from 'material-ui-next/Switch'; // eslint-disable-line
import Profile from './Profile';
import LabeledControl from './LabeledControl';
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
    this.props.onSettingChange('videoEnabled', value);
  };

  handleVideoSizeChange = (e, value) => {
    this.props.onSettingChange('videoSize', value ? 'large' : 'small');
  };

  handleMentionSoundChange = (e, value) => {
    this.props.onSettingChange('mentionSound', value);
  };

  handleLanguageChange = (event) => {
    this.props.onChangeLanguage(event.target.value);
  };

  render() {
    const {
      t,
      className,
      settings,
      user,
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
            <LabeledControl label={t('settings.videoEnabled')}>
              <Switch
                checked={settings.videoEnabled}
                onChange={this.handleVideoEnabledChange}
              />
            </LabeledControl>
            <LabeledControl label={t('settings.videoSize')}>
              <Switch
                checked={settings.videoSize === 'large'}
                onChange={this.handleVideoSizeChange}
              />
            </LabeledControl>
            <LabeledControl label={t('settings.mentionSound')}>
              <Switch
                checked={settings.mentionSound}
                onChange={this.handleMentionSoundChange}
              />
            </LabeledControl>
            <LabeledControl label={t('settings.language')}>
              <LanguagePicker
                value={settings.language}
                onChange={this.handleLanguageChange}
              />
            </LabeledControl>
          </FormGroup>
          <hr className="SettingsPanel-divider" />
          <Links />
          <hr className="SettingsPanel-divider" />
          <LogoutButton onLogout={onLogout} />
        </div>
        <div className="SettingsPanel-column SettingsPanel-column--right">
          <NotificationSettings
            settings={settings}
            onSettingChange={this.props.onSettingChange}
          />
          <hr className="SettingsPanel-divider" />
        </div>
      </div>
    );
  }
}

export default enhance(SettingsPanel);
