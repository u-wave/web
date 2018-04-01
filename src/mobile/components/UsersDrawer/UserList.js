import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
import List, { ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import CurrentDJIcon from 'material-ui-icons/PlayArrow';
import UserRow from './UserRow';
import WaitlistPosition from './WaitlistPosition';

const JoinWaitlistButton = withProps({
  variant: 'raised',
  color: 'primary',
  style: {
    marginLeft: 16,
    marginBottom: 8,
  },
})(Button);

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

    <List
      subheader={<ListSubheader>{t('waitlist.title')}</ListSubheader>}
    >
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
      >
        {t('waitlist.join')}
      </JoinWaitlistButton>
    )}

    <Divider />

    <List
      subheader={<ListSubheader>{t('users.title')}</ListSubheader>}
    >
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
