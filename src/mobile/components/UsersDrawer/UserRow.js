import * as React from 'react';
import withProps from 'recompose/withProps';
import MuiAvatar from 'material-ui/Avatar';
import { ListItem as MuiListItem } from 'material-ui/List';
import Username from '../../../components/Username';

const Avatar = withProps({
  size: 24
})(MuiAvatar);

const ListItem = withProps({
  innerDivStyle: {
    padding: '12px 0px 12px 56px'
  }
})(MuiListItem);

const waitlistPositionStyle = {
  margin: 8
};

const UserRow = ({
  user,
  waitlistPosition
}) => (
  <ListItem
    leftAvatar={<Avatar src={user.avatar || `https://welovekpop.club/a/${user._id}`} />}
    primaryText={<Username user={user} />}
    rightIcon={waitlistPosition && (
      <span style={waitlistPositionStyle}>{waitlistPosition}</span>
    )}
  />
);

UserRow.propTypes = {
  user: React.PropTypes.object.isRequired,
  waitlistPosition: React.PropTypes.number
};

export default UserRow;
