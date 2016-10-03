import * as React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { fade } from 'material-ui/utils/colorManipulator';

const tempRoleNames = {
  user: 'User',
  special: 'Special',
  moderator: 'Moderator',
  manager: 'Manager',
  admin: 'Admin'
};

const getRoleName = (role) => {
  if (role in tempRoleNames) {
    return tempRoleNames[role];
  }
  return role[0].toUpperCase() + role.slice(1);
};

const roleStyle = color => ({
  color,
  borderColor: color,
  backgroundColor: fade(color, 0.15)
});

const UserRoles = ({
  muiTheme,
  roles
}) => (
  <ul className="UserRoles">
    {roles.map(roleName => (
      <li
        key={roleName}
        className="UserRoles-role"
        style={roleStyle(muiTheme.rankColors[roleName] || muiTheme.palette.textColor)}
      >
        {getRoleName(roleName)}
      </li>
    ))}
  </ul>
);

UserRoles.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default muiThemeable()(UserRoles);
