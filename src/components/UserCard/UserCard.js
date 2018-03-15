import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import Avatar from '../Avatar';
import UserRoles from './UserRoles';
import formatJoinDate from '../../utils/formatJoinDate';

// Our cards are much smaller than usual so we remove some padding to make it
// look less strange.
const smallPaddingStyle = {
  paddingTop: 0,
};

const UserCard = ({ user }) => (
  <Card className="UserCard">
    <CardHeader
      title={user.username}
      subtitle={<UserRoles roles={user.roles} />}
      avatar={<Avatar className="UserCard-avatar" user={user} />}
    />
    <CardText style={smallPaddingStyle}>
      Joined: {formatJoinDate(user.createdAt)}
    </CardText>
    <CardActions style={smallPaddingStyle}>
      {/* Currently empty */}
    </CardActions>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
