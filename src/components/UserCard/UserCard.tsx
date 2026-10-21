import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import cx from 'clsx';
import useHasRole from '../../hooks/useHasRole';
import useIntl from '../../hooks/useIntl';
import { useSelector } from '../../hooks/useRedux';
import { currentUserHasRoleSelector, type User, userHasRoleSelector } from '../../reducers/users';
import { djAndWaitlistUsersSelector } from '../../reducers/waitlist';
import type { StoreState } from '../../redux/configureStore';
import Avatar from '../Avatar';
import AddToWaitlistButton from './AddToWaitlistButton';
import BanButton from './BanButton';
import RemoveFromWaitlistButton from './RemoveFromWaitlistButton';
import UserRoles from './UserRoles';

function waitlistUserIDsSetSelector(state: StoreState) {
  return new Set(
    djAndWaitlistUsersSelector(state)
      .filter(Boolean)
      .map((user) => user!._id),
  );
}

type UserCardProps = {
  className?: string,
  user: User,
};
function UserCard({ className, user }: UserCardProps) {
  const { dateTimeFormatter } = useIntl();
  const waitlistUsers = useSelector(waitlistUserIDsSetSelector);
  const canAddToWaitlist = useHasRole('waitlist.add');
  const canRemoveFromWaitlist = useHasRole('waitlist.remove');
  const isInWaitlist = waitlistUsers.has(user._id);
  const canBan = useSelector((state) => {
    return currentUserHasRoleSelector(state, 'users.bans.add')
      && !userHasRoleSelector(state, user, 'users.bans.add');
  });

  const joinDate = new Date(user.createdAt);

  const actions = (
    <>
      {!isInWaitlist && canAddToWaitlist ? <AddToWaitlistButton user={user} /> : null}
      {isInWaitlist && canRemoveFromWaitlist ? <RemoveFromWaitlistButton user={user} /> : null}
      {canBan ? <BanButton user={user} /> : null}
    </>
  );

  return (
    <Card className={cx('UserCard', className)}>
      <CardHeader
        className="UserCard-header"
        title={user.username}
        subheader={<UserRoles roles={user.roles} />}
        avatar={<Avatar className="UserCard-avatar" user={user} />}
      />
      <CardContent className="UserCard-joinDate">
        <Typography>
          Joined: {dateTimeFormatter.format(joinDate)}
        </Typography>
      </CardContent>
      <CardActions className="UserCard-actions">
        {actions}
      </CardActions>
    </Card>
  );
}

export default UserCard;
