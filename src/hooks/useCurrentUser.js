import { useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/userSelectors';

export default function useCurrentUser() {
  return useSelector(currentUserSelector);
}
