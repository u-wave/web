import { mdiCancel } from '@mdi/js';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslator } from '@u-wave/react-translate';
import { useDispatch } from '../../hooks/useRedux';
import { banUser, type User } from '../../reducers/users';
import SvgIcon from '../SvgIcon';

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
