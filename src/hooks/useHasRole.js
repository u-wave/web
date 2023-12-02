import { currentUserHasRoleSelector } from '../selectors/userSelectors';
import { useSelector } from './useRedux';

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
