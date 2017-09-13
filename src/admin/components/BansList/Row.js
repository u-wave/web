import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ms from 'ms';
import {
  TableRow,
  TableRowColumn as TableCell
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Username from '../../../components/Username/WithCard';

const enhance = translate();

const BanRow = ({
  t,
  ban,
  onUnbanUser
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
    <TableCell>
      <RaisedButton
        onClick={onUnbanUser}
        label={t('admin.unban')}
      />
    </TableCell>
  </TableRow>
);

BanRow.propTypes = {
  t: PropTypes.func.isRequired,
  ban: PropTypes.shape({
    user: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired,
    reason: PropTypes.string,
    moderator: PropTypes.object.isRequired
  }).isRequired,
  onUnbanUser: PropTypes.func.isRequired
};

export default enhance(BanRow);
