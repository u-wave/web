import React from 'react';
import PropTypes from 'prop-types';
import ms from 'ms';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn as TableCell
} from 'material-ui/Table';

import Username from '../../../components/Username/WithCard';

const BanRow = ({
  ban
}) => (
  <TableRow>
    <TableCell>
      <Username user={ban.user} />
    </TableCell>
    <TableCell>
      {ms(ban.duration, { long: true })}
    </TableCell>
    <TableCell>
      {ban.reason || <em>No reason given.</em>}
    </TableCell>
    <TableCell>
      <Username user={ban.moderator} />
    </TableCell>
  </TableRow>
);

BanRow.propTypes = {
  ban: PropTypes.shape({
    user: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired,
    reason: PropTypes.string,
    moderator: PropTypes.object.isRequired
  }).isRequired
};

const BansList = ({
  bans
}) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>User</TableHeaderColumn>
        <TableHeaderColumn>Duration</TableHeaderColumn>
        <TableHeaderColumn>Reason</TableHeaderColumn>
        <TableHeaderColumn>Banned By</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {bans.map(ban => <BanRow ban={ban} />)}
    </TableBody>
  </Table>
);

BansList.propTypes = {
  bans: PropTypes.array.isRequired
};

export default BansList;
