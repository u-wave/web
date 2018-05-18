import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '../Avatar';
import UserRoles from './UserRoles';
import formatJoinDate from '../../utils/formatJoinDate';

const UserCard = ({ user }) => (
  <Card className="UserCard">
    <CardHeader
      className="UserCard-header"
      title={user.username}
      subheader={<UserRoles roles={user.roles} />}
      avatar={<Avatar className="UserCard-avatar" user={user} />}
    />
    <CardContent className="UserCard-joinDate">
      <Typography>
        Joined: {formatJoinDate(user.createdAt)}
      </Typography>
    </CardContent>
    <CardActions className="UserCard-actions">
      {/* Currently empty */}
    </CardActions>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
