import cx from 'classnames';
import React from 'react';
import Panel from '../PanelSwitcher/Panel';
import UserList from '../UserList';
import UserStore from '../../stores/UserStore';
import listen from '../../utils/listen';

function getState() {
  return {
    users: UserStore.getOnlineUsers()
  };
}

function compareUsers(a, b) {
  if (a.role > b.role) {
    return -1;
  }
  if (a.role < b.role) {
    return 1;
  }
  if (a.username.toLowerCase() > b.username.toLowerCase()) {
    return 1;
  }
  if (a.username.toLowerCase() < b.username.toLowerCase()) {
    return -1;
  }
  return 0;
}

@listen(UserStore)
export default class UserPanel extends Panel {
  static propTypes = {
    className: React.PropTypes.string
  };

  state = getState();

  onChange() {
    this.setState(getState());
  }

  render() {
    const users = this.state.users.slice();
    users.sort(compareUsers);

    return (
      <UserList
        className={cx('Panel', this.props.className)}
        users={users}
      />
    );
  }
}
