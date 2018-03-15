import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import Avatar from '../Avatar';

const fullSizeStyle = {
  width: '100%',
  height: '100%',
};

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
      <SettingsIcon
        color="#fff"
        style={fullSizeStyle}
      />
    </div>
  </button>
);

UserInfo.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default pure(UserInfo);
