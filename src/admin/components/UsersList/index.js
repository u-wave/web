import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// eslint-disable-next-line
import Table, {
  TableBody,
  TableHead,
  TableFooter,
  TableCell,
  TableRow,
  TablePagination,
} from 'material-ui/Table';
import UserRow from './Row';
import Header from './Header';

const enhance = translate();

const UsersList = ({
  t,
  pageSize,
  currentPage,
  totalUsers,
  users,
  onChangePage,
  onFilter,
}) => (
  <React.Fragment>
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
        {users.map(user => (
          <UserRow user={user} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={totalUsers}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[pageSize]}
            page={currentPage}
            onChangePage={onChangePage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </React.Fragment>
);

UsersList.propTypes = {
  t: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalUsers: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default enhance(UsersList);
