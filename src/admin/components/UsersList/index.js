import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from '../../../components/Table';
import UserRow from './Row';

const avatarStyle = {
  width: 24
};

const enhance = translate();

const UsersList = ({
  t,
  users
}) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn style={avatarStyle} />
        <TableHeaderColumn>{t('admin.users.user')}</TableHeaderColumn>
        <TableHeaderColumn>{t('admin.users.joinedAt')}</TableHeaderColumn>
        <TableHeaderColumn>{t('admin.users.email')}</TableHeaderColumn>
        <TableHeaderColumn>{t('admin.users.roles')}</TableHeaderColumn>
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody stripedRows>
      {users.map(user => (
        <UserRow user={user} />
      ))}
    </TableBody>
  </Table>
);

UsersList.propTypes = {
  t: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default enhance(UsersList);
