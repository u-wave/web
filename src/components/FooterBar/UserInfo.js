import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import SettingsIcon from 'material-ui-icons/Settings';

import Avatar from '../Avatar';

const enhance = pure;

const UserInfo = ({ className, user, onClick }) => (
  <button
    className={cx('UserInfo', className)}
    onClick={onClick}
  >
    <Avatar
      className="UserInfo-avatar"
      user={user}
    />
    <div className="UserInfo-settings">
      <SettingsIcon className="UserInfo-settingsIcon" />
    </div>
  </button>
);

UserInfo.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default enhance(UserInfo);
