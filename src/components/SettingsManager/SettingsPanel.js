import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/lib/toggle';
import FlatButton from 'material-ui/lib/flat-button';
import LicenseIcon from 'material-ui/lib/svg-icons/action/copyright';

import GithubIcon from './GithubIcon';
import Profile from './Profile';

const linkStyle = {
  display: 'block',
  height: 24,
  lineHeight: '24px',
  marginBottom: 20
};
const iconStyle = { verticalAlign: 'top' };

const linkProps = {
  style: linkStyle,
  linkButton: true,
  target: '_blank',
  labelPosition: 'after',
  hoverColor: 'transparent',
  textTransform: 'none'
};

export default class SettingsPanel extends Component {
  static propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object.isRequired,
    user: PropTypes.object,
    onSettingChange: PropTypes.func.isRequired
  };

  render() {
    const { className, settings, user, onSettingChange } = this.props;

    const profile = user && [
      <Profile user={user} />,
      <hr className="SettingsPanel-divider" />
    ];

    const toggles = [
      <Toggle
        label="Play Audio/Video"
        labelPosition="right"
        defaultToggled={settings.videoEnabled}
        onToggle={(e, value) => onSettingChange('videoEnabled', value)}
      />,
      <Toggle
        label="Full-size Video"
        labelPosition="right"
        defaultToggled={settings.videoSize === 'large'}
        onToggle={(e, value) => onSettingChange('videoSize', value ? 'large' : 'small')}
      />,
      <Toggle
        label="Chat Mention Sound"
        labelPosition="right"
        defaultToggled={settings.mentionSound}
        onToggle={(e, value) => onSettingChange('mentionSound', value)}
      />
    ];

    return (
      <div className={cx('SettingsPanel', className)}>
        {profile}
        <h2 className="SettingsPanel-header">Settings</h2>
        <div className="SettingsPanel-column SettingsPanel-column--left">
          {toggles.map(toggle =>
            <div className="SettingsPanel-toggle">{toggle}</div>
          )}
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
