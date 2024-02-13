import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiCancel } from '@mdi/js';
import { useDispatch } from '../../hooks/useRedux';
import SvgIcon from '../SvgIcon';
import { banUser, type User } from '../../reducers/users';

type BanButtonProps = {
  user: User,
};
function BanButton({ user }: BanButtonProps) {
  const { t } = useTranslator();
  const dispatch = useDispatch();

  return (
    <Tooltip title={t('users.ban')}>
      <IconButton onClick={() => dispatch(banUser({ userID: user._id }))}>
        <SvgIcon path={mdiCancel} />
      </IconButton>
    </Tooltip>
  );
}

export default BanButton;
