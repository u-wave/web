import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn as TableCell
} from 'material-ui/Table';

import Avatar from '../../../components/Avatar';
import Username from '../../../components/Username/WithCard';

const UserRow = ({
  user
}) => (
  <TableRow>
    <TableCell>
      <Avatar user={user} />
    </TableCell>
    <TableCell>
      <Username user={user} />
    </TableCell>
  </TableRow>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired
};

const UsersList = ({
  users
}) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn />
        <TableHeaderColumn>User</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map(user => <UserRow user={user} />)}
    </TableBody>
  </Table>
);

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;
