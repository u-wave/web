import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import LicenseIcon from 'material-ui/svg-icons/action/copyright';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';

import GithubIcon from './GithubIcon';
import Profile from './Profile';

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
  linkButton: true,
  target: '_blank',
  labelPosition: 'after',
  backgroundColor: 'transparent',
  hoverColor: 'transparent',
  textTransform: 'none'
};

export default class SettingsPanel extends Component {
  static propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
    user: PropTypes.object,
    onSettingChange: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  handleLogout = () => {
    if (confirm('Sure?')) {
      this.props.onLogout();
    }
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

  render() {
    const {
      className, settings, user,
      onChangeUsername
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
        label="Play Audio/Video"
        labelPosition="right"
        defaultToggled={settings.videoEnabled}
        onToggle={this.handleVideoEnabledChange}
      />,
      <Toggle
        label="Full-size Video"
        labelPosition="right"
        defaultToggled={settings.videoSize === 'large'}
        onToggle={this.handleVideoSizeChange}
      />,
      <Toggle
        label="Chat Mention Sound"
        labelPosition="right"
        defaultToggled={settings.mentionSound}
        onToggle={this.handleMentionSoundChange}
      />
    ];

    return (
      <div className={cx('SettingsPanel', className)}>
        {profile}
        <h2 className="SettingsPanel-header">Settings</h2>
        <div className="SettingsPanel-column SettingsPanel-column--left">
          {toggles.map((toggle, i) =>
            <div
              key={i}
              className="SettingsPanel-toggle"
            >
              {toggle}
            </div>
          )}
          <FlatButton
            label="Sign out"
            labelPosition="after"
            icon={<LogoutIcon />}
            onClick={this.handleLogout}
          />
        </div>
        <div className="SettingsPanel-column SettingsPanel-column--right">
          <FlatButton
            href="https://github.com/u-wave"
            label="üWave"
            {...linkProps}
          >
            <GithubIcon style={iconStyle} />
          </FlatButton>
          <FlatButton
            href="https://github.com/u-wave/u-wave-web"
            label="üWave Web Client Source Code"
            {...linkProps}
          >
            <GithubIcon style={iconStyle} />
          </FlatButton>
          <FlatButton
            href="https://github.com/u-wave/u-wave-web/tree/master/LICENSE"
            label="License"
            {...linkProps}
          >
            <LicenseIcon style={iconStyle} />
          </FlatButton>
        </div>
      </div>
    );
  }
}
