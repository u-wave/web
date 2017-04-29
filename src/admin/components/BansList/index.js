import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import BanRow from './Row';

const BansList = ({
  bans,
  onUnbanUser
}) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>User</TableHeaderColumn>
        <TableHeaderColumn>Duration</TableHeaderColumn>
        <TableHeaderColumn>Reason</TableHeaderColumn>
        <TableHeaderColumn>Banned By</TableHeaderColumn>
        <TableHeaderColumn>Actions</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {bans.map(ban => (
        <BanRow
          key={ban.user._id}
          ban={ban}
          onUnbanUser={() => onUnbanUser(ban.user)}
        />
      ))}
    </TableBody>
  </Table>
);

BansList.propTypes = {
  bans: PropTypes.array.isRequired,
  onUnbanUser: PropTypes.func.isRequired
};

export default BansList;
