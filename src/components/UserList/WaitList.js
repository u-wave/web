import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../UserList';

function mapStateToProps(state) {
  return {
    users: state.waitlist.waitlist
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
