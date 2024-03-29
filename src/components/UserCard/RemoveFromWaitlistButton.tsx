import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '../SvgIcon';
import { useDispatch } from '../../hooks/useRedux';
import { removeWaitlistUser } from '../../reducers/waitlist';
import type { User } from '../../reducers/users';

// From https://fonts.google.com/icons?selected=Material%20Icons%3Agroup_remove%3A
const mdiGroupRemove = 'M24,9v2h-6V9H24z M8,4C5.79,4,4,5.79,4,8s1.79,4,4,4s4-1.79,4-4S10.21,4,8,4z M8,13c-2.67,0-8,1.34-8,4v3h16v-3 C16,14.34,10.67,13,8,13z M12.51,4.05C13.43,5.11,14,6.49,14,8s-0.57,2.89-1.49,3.95C14.47,11.7,16,10.04,16,8S14.47,4.3,12.51,4.05 z M16.53,13.83C17.42,14.66,18,15.7,18,17v3h2v-3C20,15.55,18.41,14.49,16.53,13.83z';

type RemoveFromWaitlistButtonProps = {
  user: User,
};
function RemoveFromWaitlistButton({ user }: RemoveFromWaitlistButtonProps) {
  const { t } = useTranslator();
  const dispatch = useDispatch();

  return (
    <Tooltip title={t('waitlist.remove')}>
      <IconButton onClick={() => dispatch(removeWaitlistUser({ userID: user._id }))}>
        <SvgIcon path={mdiGroupRemove} />
      </IconButton>
    </Tooltip>
  );
}

export default RemoveFromWaitlistButton;
