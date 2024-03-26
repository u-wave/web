import { currentUserHasRoleSelector } from '../reducers/users';
import { useSelector } from './useRedux';

/** Check if the current user has the given role. */
export default function useHasRole(roleName: string) {
  return useSelector((state) => currentUserHasRoleSelector(state, roleName));
}
