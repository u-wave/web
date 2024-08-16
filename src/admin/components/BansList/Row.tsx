import { useTranslator } from '@u-wave/react-translate';
import ms from 'ms';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Avatar from '../../../components/Avatar';
import Username from '../../../components/Username/WithCard';
import type { User } from '../../../reducers/users';

const avatarStyle = {
  width: 48,
  paddingRight: 0,
};

type BanRowProps = {
  ban: {
    user: User,
    duration: number,
    reason: string | null,
    moderator: User,
  },
  onUnbanUser: () => void,
};
function BanRow({ ban, onUnbanUser }: BanRowProps) {
  const { t } = useTranslator();

  return (
    <TableRow>
      <TableCell style={avatarStyle}>
        <Avatar user={ban.user} />
      </TableCell>
      <TableCell>
        <Username user={ban.user} />
      </TableCell>
      <TableCell>
        {ms(ban.duration, { long: true })}
      </TableCell>
      <TableCell>
        {ban.reason ?? (
          <em>{t('admin.bans.noReason')}</em>
        )}
      </TableCell>
      <TableCell>
        <Username user={ban.moderator} />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          onClick={onUnbanUser}
        >
          {t('admin.bans.unban')}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default BanRow;
