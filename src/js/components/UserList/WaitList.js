import cx from 'classnames';
import React, { Component } from 'react';
import UserList from '../UserList';
import WaitlistStore from '../../stores/WaitlistStore';
import listen from '../../utils/listen';

function getState() {
  return {
    users: WaitlistStore.getUsers()
  };
}

@listen(WaitlistStore)
export default class WaitList extends Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  state = getState();

  onChange() {
    this.setState(getState());
  }

  render() {
    return (
      <UserList
        className={cx('WaitList', this.props.className)}
        users={this.state.users}
      />
    );
  }
}
