import { useTranslator } from '@u-wave/react-translate';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import BanRow from './Row';
import type { User } from '../../../reducers/users';

const headerStyle = {
  background: '#9d2053',
  padding: '12px 24px',
  lineHeight: '35px',
};
function Header(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div style={headerStyle} {...props} />;
}

const filterStyle = {
  background: '#631032',
  color: '#ffffff',
  border: 0,
  marginLeft: 12,
  paddingLeft: 12,
  height: 35,
};
function Filter(props: React.ComponentPropsWithoutRef<'input'>) {
  return <input type="text" style={filterStyle} {...props} />;
}

type BansListProps = {
  bans: {
    user: User,
    duration: number,
    reason: string | null,
    moderator: User,
  }[],
  count: number,
  pageSize: number,
  currentPage: number,
  onUnbanUser: (user: User) => void,
  onPageChange: (page: number) => void,
  onFilter: (filter: string) => void,
};

function BansList({
  bans,
  count,
  pageSize,
  currentPage,
  onUnbanUser,
  onPageChange,
  onFilter,
}: BansListProps) {
  const { t } = useTranslator();

  return (
    <TableContainer>
      <Header>
        <span>Managing Bans:</span>
        <span style={{ float: 'right' }}>
          Filter User:
          <Filter onInput={(event) => onFilter(event.currentTarget.value)} />
        </span>
      </Header>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{t('admin.bans.user')}</TableCell>
            <TableCell>{t('admin.bans.duration')}</TableCell>
            <TableCell>{t('admin.bans.reason')}</TableCell>
            <TableCell>{t('admin.bans.bannedBy')}</TableCell>
            <TableCell>{t('admin.bans.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bans.map((ban) => (
            <BanRow
              key={ban.user._id}
              ban={ban}
              onUnbanUser={() => onUnbanUser(ban.user)}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[pageSize]}
              page={currentPage}
              onPageChange={(_event, page) => onPageChange(page)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default BansList;
