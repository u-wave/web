import cx from 'clsx';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useSelector } from '../../hooks/useRedux';
import useIntl from '../../hooks/useIntl';
import useHasRole from '../../hooks/useHasRole';
import { djAndWaitlistUsersSelector } from '../../reducers/waitlist';
import { type User, currentUserHasRoleSelector, userHasRoleSelector } from '../../reducers/users';
import type { StoreState } from '../../redux/configureStore';
import Avatar from '../Avatar';
import UserRoles from './UserRoles';
import AddToWaitlistButton from './AddToWaitlistButton';
import RemoveFromWaitlistButton from './RemoveFromWaitlistButton';
import BanButton from './BanButton';

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
