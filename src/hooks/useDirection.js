import { useTheme } from '@material-ui/core/styles';

export default function useDirection() {
  return useTheme().direction;
}
