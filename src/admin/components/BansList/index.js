import * as React from 'react';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import ms from 'ms';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn as TableCell
} from 'material-ui/Table';

import userCardable from '../../../utils/userCardable';
import Username from '../../../components/Username';

const UsernameBase = ({ user, onUsernameClick }) => (
  <button onClick={onUsernameClick}>
    <Username user={user} />
  </button>
);

UsernameBase.propTypes = {
  user: React.PropTypes.object.isRequired,
  onUsernameClick: React.PropTypes.func.isRequired
};

const UsernameWithCard = compose(
  userCardable(),
  withProps(props => ({
    onUsernameClick(event) {
      event.preventDefault();
      props.openUserCard(props.user);
    }
  }))
)(UsernameBase);

const BanRow = ({
  ban
}) => (
  <TableRow>
    <TableCell>
      <UsernameWithCard user={ban.user} />
    </TableCell>
    <TableCell>
      {ms(ban.duration, { long: true })}
    </TableCell>
    <TableCell>
      {ban.reason || <em>No reason given.</em>}
    </TableCell>
    <TableCell>
      <UsernameWithCard user={ban.moderator} />
    </TableCell>
  </TableRow>
);

BanRow.propTypes = {
  ban: React.PropTypes.shape({
    user: React.PropTypes.object.isRequired,
    duration: React.PropTypes.number.isRequired,
    reason: React.PropTypes.string,
    moderator: React.PropTypes.object.isRequired
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
  bans: React.PropTypes.array.isRequired
};

export default BansList;
