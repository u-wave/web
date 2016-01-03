import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { userListSelector } from '../selectors/userSelectors';
import UserList from '../components/UserList';

const mapStateToProps = createStructuredSelector({
  users: userListSelector
});

@connect(mapStateToProps)
export default class RoomUsersContainer extends Component {
  render() {
    return <UserList {...this.props} />;
  }
}
