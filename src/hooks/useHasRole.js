import { useSelector } from 'react-redux';
import { currentUserHasRoleSelector } from '../selectors/userSelectors';

/**
 * Check if the current user has the given role.
 *
 * @param {string} roleName
 * @returns {boolean}
 */
export default function useHasRole(roleName) {
  const hasRole = useSelector(currentUserHasRoleSelector);
  return hasRole(roleName);
}
