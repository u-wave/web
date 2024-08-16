import { useTranslator } from '@u-wave/react-translate';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import UserRow from './Row';
import Header from './Header';
import type { User } from '../../../reducers/users';

type UsersListProps = {
  users: User[],
  totalUsers: number,
  pageSize: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  onFilter: (value: string) => void,
};
function UsersList({
  pageSize,
  currentPage,
  totalUsers,
  users,
  onPageChange,
  onFilter,
}: UsersListProps) {
  const { t } = useTranslator();

  return (
    <TableContainer>
      <Header onFilter={onFilter} />
      <Table size="small">
        <TableHead>
          <TableRow className="AdminUserRow">
            <TableCell className="AdminUserRow-avatar" />
            <TableCell>{t('admin.users.user')}</TableCell>
            <TableCell>{t('admin.users.joinedAt')}</TableCell>
            <TableCell>{t('admin.users.email')}</TableCell>
            <TableCell>{t('admin.users.roles')}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={totalUsers}
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

export default UsersList;
