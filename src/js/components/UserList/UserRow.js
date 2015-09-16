import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';

export default class UserRow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    username: React.PropTypes.string
  };

  render() {
    return (
      <div className={cx('UserRow', this.props.className)}>
        <Avatar
          className="UserRow-avatar"
          username={this.props.username}
        />
        <span className="UserRow-username">{this.props.username}</span>
      </div>
    );
  }
}
