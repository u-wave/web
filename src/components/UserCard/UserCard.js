import * as React from 'react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardActions from 'material-ui/Card/CardActions';
import CardText from 'material-ui/Card/CardText';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Avatar from '../Avatar';

const formatJoinDate = date => new Date(date).toLocaleString([], {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
});

const tempRoleIDToReadableName = [
  'User',
  'Special',
  'Moderator',
  'Manager',
  'Admin'
];

const tempRoleIDToRoleName = {
  0: 'default',
  1: 'special',
  2: 'moderator',
  3: 'manager',
  4: 'admin'
};

// Our cards are much smaller than usual so we remove some padding to make it
// look less strange.
const smallPaddingStyle = {
  paddingTop: 0
};

const UserCard = ({ muiTheme, user }) => (
  <Card className="UserCard">
    <CardHeader
      title={user.username}
      subtitle={tempRoleIDToReadableName[user.role]}
      subtitleColor={muiTheme.rankColors[tempRoleIDToRoleName[user.role]]}
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
  muiTheme: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

export default muiThemeable()(UserCard);
