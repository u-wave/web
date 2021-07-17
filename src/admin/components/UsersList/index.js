import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserRow from './Row';
import Header from './Header';

function UsersList({
  pageSize,
  currentPage,
  totalUsers,
  users,
  onPageChange,
  onFilter,
}) {
  const { t } = useTranslator();

  return (
    <>
      <Header onFilter={onFilter} />
      <Table>
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
              onPageChange={onPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

UsersList.propTypes = {
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalUsers: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default UsersList;
