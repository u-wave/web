import React, { Component } from 'react';
import naturalCmp from 'natural-compare';
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
  return naturalCmp(a.username.toLowerCase(), b.username.toLowerCase());
}

@listen(UserStore)
export default class RoomUsers extends Component {
  state = getState();

  onChange() {
    this.setState(getState());
  }

  render() {
    const users = this.state.users.slice();
    users.sort(compareUsers);

    return (
      <UserList
        users={users}
        {...this.props}
      />
    );
  }
}
