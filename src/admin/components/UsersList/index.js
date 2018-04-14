import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import withProps from 'recompose/withProps';
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

const Header = withProps({
  style: {
    background: '#9d2053',
    padding: '12px 24px',
    lineHeight: '35px',
  },
})('div');

const Filter = withProps({
  style: {
    background: '#631032',
    color: '#ffffff',
    border: 0,
    marginLeft: 12,
    paddingLeft: 12,
    height: 35,
  },
  type: 'text',
})('input');

const enhance = translate();

const UsersList = ({
  t,
  pageSize,
  currentPage,
  totalUsers,
  users,
  onChangePage,
}) => (
  <React.Fragment>
    <Header>
      <span>Managing Users:</span>
      <span style={{ float: 'right' }}>
        Filter User:
        <Filter />
      </span>
    </Header>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
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
};

export default enhance(UsersList);
