import React from 'react';
import cx from 'clsx';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useIntl from '../../hooks/useIntl';
import Avatar from '../Avatar';
import UserRoles from './UserRoles';

function UserCard({ className, user }) {
  const { dateTimeFormatter } = useIntl();

  const joinDate = new Date(user.createdAt);

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
        {/* Currently empty */}
      </CardActions>
    </Card>
  );
}

UserCard.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default UserCard;
