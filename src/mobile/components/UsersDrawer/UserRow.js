import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import MuiAvatar from 'material-ui/Avatar';
import { ListItem as MuiListItem } from 'material-ui/List';
import Username from '../../../components/Username';

const Avatar = withProps({
  size: 24,
})(MuiAvatar);

const ListItem = withProps({
  innerDivStyle: {
    padding: '12px 0px 12px 56px',
  },
})(MuiListItem);

const UserRow = ({
  user,
  icon,
}) => (
  <ListItem
    leftAvatar={<Avatar src={user.avatar || `https://welovekpop.club/a/${user._id}`} />}
    primaryText={<Username user={user} />}
    rightIcon={icon}
  />
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  icon: PropTypes.node,
};

export default UserRow;
