import UserRole from '../UserRole';

type UserRolesProps = {
  /** The roles to display. */
  roles: string[],
};
/** A list of roles. */
function UserRoles({ roles }: UserRolesProps) {
  return (
    <div className="UserRoles">
      {roles.map((roleName) => (
        <div className="UserRoles-role" key={roleName}>
          <UserRole roleName={roleName} />
        </div>
      ))}
    </div>
  );
}

export default UserRoles;
