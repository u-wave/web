import { useSelector } from './useRedux';
import useCurrentUser from './useCurrentUser';
import type { User } from '../reducers/users';

function getAllUserRoles(roles: Record<string, string[]>, user: User) {
  function getSubRoles(subRoles: string[], role: string): string[] {
    // Recursive Reduce!
    return roles[role]!.reduce(
      getSubRoles,
      [role, ...subRoles],
    );
  }
  return user.roles ? user.roles.reduce(getSubRoles, []) : [];
}

/** Check if the current user has the given role. */
export default function useHasRole(roleName: string) {
  const currentUser = useCurrentUser();
  const roles = useSelector((state) => state.config.roles);
  if (currentUser && roles) {
    const userRoles = getAllUserRoles(roles, currentUser);
    return userRoles.includes(roleName) || currentUser.roles.includes('*');
  }
  return false;
}
