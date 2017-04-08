import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

import UserRow from './UserRow';

const JoinWaitlistButton = withProps({
  primary: true,
  style: {
    marginLeft: 16,
    marginBottom: 8
  }
})(RaisedButton);

const UserList = ({
  t,
  users,
  waitlist,
  isLockedWaitlist,
  userInWaitlist,
  onJoinWaitlist
}) => (
  <div>
    <List>
      <Subheader>{t('waitlist.title')}</Subheader>
      {waitlist.map((user, position) => (
        <UserRow
          key={user._id}
          user={user}
          waitlistPosition={position + 1}
        />
      ))}
    </List>
    {!userInWaitlist && (
      <JoinWaitlistButton
        onClick={() => onJoinWaitlist()}
        disabled={isLockedWaitlist}
        label={t('waitlist.join')}
      />
    )}
    <Divider />
    <List>
      <Subheader>{t('users.title')}</Subheader>
      {users.map(user => (
        <UserRow key={user._id} user={user} />
      ))}
    </List>
  </div>
);

UserList.propTypes = {
  t: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  waitlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  userInWaitlist: PropTypes.bool,
  isLockedWaitlist: PropTypes.bool,
  onJoinWaitlist: PropTypes.func.isRequired
};

export default translate()(UserList);
