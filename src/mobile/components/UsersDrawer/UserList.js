import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import CurrentDJIcon from 'material-ui/svg-icons/av/play-arrow';
import UserRow from './UserRow';
import WaitlistPosition from './WaitlistPosition';

const JoinWaitlistButton = withProps({
  primary: true,
  style: {
    marginLeft: 16,
    marginBottom: 8,
  },
})(RaisedButton);

const UserList = ({
  t,
  currentDJ,
  users,
  waitlist,
  isLockedWaitlist,
  userIsLoggedIn,
  userInWaitlist,
  onJoinWaitlist,
}) => (
  <div>
    {currentDJ && <Divider />}

    <List>
      <Subheader>{t('waitlist.title')}</Subheader>
      {currentDJ && (
        <UserRow
          user={currentDJ}
          icon={<CurrentDJIcon style={{ margin: 5 }} />}
        />
      )}
      {waitlist.map((user, position) => (
        <UserRow
          key={user._id}
          user={user}
          icon={<WaitlistPosition position={position + 1} />}
        />
      ))}
    </List>
    {userIsLoggedIn && !userInWaitlist && (
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
  currentDJ: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  waitlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
  userInWaitlist: PropTypes.bool,
  isLockedWaitlist: PropTypes.bool,
  onJoinWaitlist: PropTypes.func.isRequired,
};

export default translate()(UserList);
