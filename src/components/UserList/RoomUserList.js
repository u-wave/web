import React, { Component } from 'react';
import { connect } from 'react-redux';
import naturalCmp from 'natural-compare';
import values from 'object-values';
import UserList from '../UserList';

function compareUsers(a, b) {
  if (a.role > b.role) {
    return -1;
  }
  if (a.role < b.role) {
    return 1;
  }
  return naturalCmp(a.username.toLowerCase(), b.username.toLowerCase());
}

function mapStateToProps(state) {
  return {
    users: values(state.users).sort(compareUsers)
  };
}

@connect(mapStateToProps)
export default class RoomUsersContainer extends Component {
  render() {
    return <UserList {...this.props} />;
  }
}
