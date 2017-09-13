import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import {
  Table as MuiTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import BanRow from './Row';

const Table = withProps({
  style: {
    background: 'transparent'
  }
})(MuiTable);

const HeaderColumn = withProps({
  style: {
    fontWeight: 'bold'
  }
})(TableHeaderColumn);

const BansList = ({
  bans,
  onUnbanUser
}) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <HeaderColumn>User</HeaderColumn>
        <HeaderColumn>Duration</HeaderColumn>
        <HeaderColumn>Reason</HeaderColumn>
        <HeaderColumn>Banned By</HeaderColumn>
        <HeaderColumn>Actions</HeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody stripedRows>
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
