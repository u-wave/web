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
  width: 48,
  paddingRight: 0
};
const actionsStyle = {
  width: 48,
  paddingLeft: 0,
  paddingRight: 0
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
        <TableHeaderColumn style={actionsStyle} />
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
