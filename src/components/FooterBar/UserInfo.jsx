import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { mdiCog } from '@mdi/js';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';

const UserInfo = ({ className, user, onClick }) => (
  <button
    type="button"
    className={cx('UserInfo', className)}
    onClick={onClick}
  >
    <Avatar
      className="UserInfo-avatar"
      user={user}
    />
    <div className="UserInfo-settings">
      <SvgIcon path={mdiCog} className="UserInfo-settingsIcon" />
    </div>
  </button>
);

UserInfo.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default React.memo(UserInfo);
