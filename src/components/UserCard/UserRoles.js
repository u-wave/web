import React from 'react';
import PropTypes from 'prop-types';
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
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserRoles;
