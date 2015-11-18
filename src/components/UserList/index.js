import cx from 'classnames';
import React from 'react';
import List from 'react-list';
import UserRow from './UserRow';

export default class UserList extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    users: React.PropTypes.array
  };

  renderRow(index, key) {
    const user = this.props.users[index];
    return (
      <UserRow
        key={key}
        className="UserList-row"
        {...user}
      />
    );
  }

  render() {
    return (
      <div className={cx('UserList', this.props.className)}>
        <List
          itemRenderer={::this.renderRow}
          length={this.props.users.length}
          type="uniform"
        />
      </div>
    );
  }
}
