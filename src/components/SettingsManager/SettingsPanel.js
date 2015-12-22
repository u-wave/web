import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/lib/toggle';

import Profile from './Profile';

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
          [Links to stuff]
        </div>
      </div>
    );
  }
}
