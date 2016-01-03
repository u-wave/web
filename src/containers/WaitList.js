import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { waitlistUsersSelector } from '../selectors/waitlistSelectors';
import UserList from '../components/UserList';

const mapStateToProps = createStructuredSelector({
  users: waitlistUsersSelector
});

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
