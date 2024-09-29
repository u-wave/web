import { useTranslator } from '@u-wave/react-translate';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Button, { type ButtonProps } from '@mui/material/Button';
import { mdiPlay } from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';
import UserRow from './UserRow';
import WaitlistPosition from './WaitlistPosition';
import type { User } from '../../../reducers/users';

function JoinWaitlistButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      style={{ marginLeft: 16, marginBottom: 8 }}
      {...props}
    />
  );
}

type UserListProps = {
  currentDJ: User | null,
  users: User[],
  waitlist: (User | undefined)[],
  isLockedWaitlist: boolean,
  userIsLoggedIn: boolean,
  userInWaitlist: boolean,
  onJoinWaitlist: () => void,
};
function UserList({
  currentDJ,
  users,
  waitlist,
  isLockedWaitlist,
  userIsLoggedIn,
  userInWaitlist,
  onJoinWaitlist,
}: UserListProps) {
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
            icon={<SvgIcon path={mdiPlay} style={{ margin: 5 }} />}
          />
        )}
        {waitlist.map((user, position) => user && (
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
        subheader={<ListSubheader>{t('users.listeners')}</ListSubheader>}
      >
        {users.map((user) => (
          <UserRow key={user._id} user={user} />
        ))}
      </List>
    </div>
  );
}

export default UserList;
