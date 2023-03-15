import { currentUserSelector } from '../selectors/userSelectors';
import { useSelector } from './useRedux';

export default function useCurrentUser() {
  return useSelector(currentUserSelector);
}
