import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CurrentDJIcon from '@material-ui/icons/PlayArrow';
import UserRow from './UserRow';
import WaitlistPosition from './WaitlistPosition';

function JoinWaitlistButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginLeft: 16, marginBottom: 8 }}
      {...props}
    />
  );
}

function UserList({
  currentDJ,
  users,
  waitlist,
  isLockedWaitlist,
  userIsLoggedIn,
  userInWaitlist,
  onJoinWaitlist,
}) {
  const { t } = useTranslator();

  return (
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
        {users.map((user) => (
          <UserRow key={user._id} user={user} />
        ))}
      </List>
    </div>
  );
}

UserList.propTypes = {
  currentDJ: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  waitlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
  userInWaitlist: PropTypes.bool,
  isLockedWaitlist: PropTypes.bool,
  onJoinWaitlist: PropTypes.func.isRequired,
};

export default UserList;
