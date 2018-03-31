import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui-next/Typography'; // eslint-disable-line
import Card from 'material-ui-next/Card/Card'; // eslint-disable-line
import CardHeader from 'material-ui-next/Card/CardHeader'; // eslint-disable-line
import CardActions from 'material-ui-next/Card/CardActions'; // eslint-disable-line
import CardContent from 'material-ui-next/Card/CardContent'; // eslint-disable-line
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
