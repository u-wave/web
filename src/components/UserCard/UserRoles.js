import * as React from 'react';
import UserRole from '../UserRole';

/**
 * A list of roles.
 */
const UserRoles = ({ roles }) => (
  <div className="UserRoles">
    {roles.map(roleName => (
      <div className="UserRoles-role" key={roleName}>
        <UserRole roleName={roleName} />
      </div>
    ))}
  </div>
);

UserRoles.propTypes = {
  /**
   * The roles to display.
   */
  roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default UserRoles;
