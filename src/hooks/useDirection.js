import { useTheme } from '@mui/material/styles';

export default function useDirection() {
  return useTheme().direction;
}
