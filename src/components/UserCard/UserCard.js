import React from 'react';
import cx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import useIntl from '../../hooks/useIntl';
import useHasRole from '../../hooks/useHasRole';
import { djSelector } from '../../selectors/boothSelectors';
import { waitlistUsersSelector } from '../../selectors/waitlistSelectors';
import { userHasRoleSelector } from '../../selectors/userSelectors';
import Avatar from '../Avatar';
import UserRoles from './UserRoles';
import AddToWaitlistButton from './AddToWaitlistButton';
import RemoveFromWaitlistButton from './RemoveFromWaitlistButton';
import BanButton from './BanButton';

const allWaitlistUsersSelector = (state) => [
  djSelector(state),
  ...waitlistUsersSelector(state),
].filter(Boolean);

function UserCard({ className, user }) {
  const { dateTimeFormatter } = useIntl();
  const waitlistUsers = useSelector(allWaitlistUsersSelector);
  const userHasRole = useSelector(userHasRoleSelector);
  const canAddToWaitlist = useHasRole('waitlist.add');
  const canRemoveFromWaitlist = useHasRole('waitlist.remove');
  const isInWaitlist = waitlistUsers.includes(user);
  const canBan = useHasRole('users.bans.add') && !userHasRole(user)('users.bans.add');

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

UserCard.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default UserCard;
