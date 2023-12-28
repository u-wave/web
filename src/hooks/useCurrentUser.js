import { currentUserSelector } from '../reducers/users';
import { useSelector } from './useRedux';

export default function useCurrentUser() {
  return useSelector(currentUserSelector);
}
