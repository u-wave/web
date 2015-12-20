import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../UserList';

function mapStateToProps({ waitlist, users }) {
  return {
    users: waitlist.waitlist.map(id => users[id])
  };
}

@connect(mapStateToProps)
export default class WaitListContainer extends Component {
  render() {
    return (
      <UserList
        className="WaitList"
        {...this.props}
      />
    );
  }
}
