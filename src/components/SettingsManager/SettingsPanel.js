import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import LicenseIcon from 'material-ui/svg-icons/action/copyright';

import GithubIcon from './GithubIcon';
import Profile from './Profile';
import LabeledControl from './LabeledControl';
import LanguagePicker from './LanguagePicker';
import LogoutButton from './LogoutButton';

const linkStyle = {
  display: 'block',
  height: 24,
  lineHeight: '24px',
  marginBottom: 20,
  textAlign: 'left',
  WebkitAppearance: 'initial'
};
const iconStyle = { verticalAlign: 'top' };

const linkProps = {
  style: linkStyle,
  target: '_blank',
  labelPosition: 'after',
  backgroundColor: 'transparent',
  hoverColor: 'transparent'
};

class SettingsPanel extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    settings: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
    onSettingChange: React.PropTypes.func.isRequired,
    onChangeUsername: React.PropTypes.func.isRequired,
    onChangeLanguage: React.PropTypes.func.isRequired,
    onLogout: React.PropTypes.func.isRequired
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

    const profile = user && [
      <Profile
        key="profile"
        user={user}
        onChangeUsername={onChangeUsername}
      />,
      <hr key="divider" className="SettingsPanel-divider" />
    ];

    const toggles = [
      <Toggle
        label={t('settings.videoEnabled')}
        defaultToggled={settings.videoEnabled}
        onToggle={this.handleVideoEnabledChange}
      />,
      <Toggle
        label={t('settings.videoSize')}
        defaultToggled={settings.videoSize === 'large'}
        onToggle={this.handleVideoSizeChange}
      />,
      <Toggle
        label={t('settings.mentionSound')}
        defaultToggled={settings.mentionSound}
        onToggle={this.handleMentionSoundChange}
      />,
      <LabeledControl id="uw-setting-language" label={t('settings.language')}>
        <LanguagePicker
          id="uw-setting-language"
          value={settings.language}
          onChange={this.handleLanguageChange}
        />
      </LabeledControl>
    ];

    return (
      <div className={cx('SettingsPanel', className)}>
        {profile}
        <h2 className="SettingsPanel-header">{t('settings.title')}</h2>
        <div className="SettingsPanel-column SettingsPanel-column--left">
          {toggles.map((toggle, i) =>
            // TODO Should move the two columns into separate pure components,
            // and use them here. That way the toggles can just be placed
            // directly in the JSX while still being readable. 🙈
            /* eslint-disable react/no-array-index-key */
            <div
              key={i}
              className="SettingsPanel-toggle"
            >
              {toggle}
            </div>
            /* eslint-enable react/no-array-index-key */
          )}
          <LogoutButton onLogout={onLogout} />
        </div>
        <div className="SettingsPanel-column SettingsPanel-column--right">
          <FlatButton
            href="https://github.com/u-wave"
            label={t('settings.links.website')}
            {...linkProps}
          >
            <GithubIcon style={iconStyle} />
          </FlatButton>
          <FlatButton
            href="https://github.com/u-wave/web"
            label={t('settings.links.source')}
            {...linkProps}
          >
            <GithubIcon style={iconStyle} />
          </FlatButton>
          <FlatButton
            href="https://github.com/u-wave/web/tree/master/LICENSE"
            label={t('settings.links.license')}
            {...linkProps}
          >
            <LicenseIcon style={iconStyle} />
          </FlatButton>
        </div>
      </div>
    );
  }
}

export default translate()(SettingsPanel);
