import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import List from 'react-list';
import UserRow from './UserRow';

const UserList = ({ className, users }) => (
  <div className={cx('UserList', className)}>
    <List
      itemRenderer={(index, key) => (
        <UserRow
          key={key}
          className="UserList-row"
          user={users[index]}
        />
      )}
      length={users.length}
      type="uniform"
    />
  </div>
);

UserList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default UserList;
