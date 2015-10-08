import cx from 'classnames';
import React from 'react';
import UserRow from './UserRow';

export default class UserList extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    users: React.PropTypes.array
  };

  render() {
    return (
      <div className={cx('UserList', this.props.className)}>
        {this.props.users.map(user => {
          return (
            <UserRow
              key={user._id}
              className="UserList-row"
              {...user}
            />
          );
        })}
      </div>
    );
  }
}
