import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ms from 'ms';
import RaisedButton from 'material-ui/RaisedButton';
import {
  TableRow,
  TableCell,
} from '../../../components/Table';
import Avatar from '../../../components/Avatar';
import Username from '../../../components/Username/WithCard';

const enhance = translate();
const avatarStyle = {
  width: 48,
  paddingRight: 0,
};

const BanRow = ({
  t,
  ban,
  onUnbanUser,
}) => (
  <TableRow>
    <TableCell style={avatarStyle}>
      <Avatar user={ban.user} />
    </TableCell>
    <TableCell>
      <Username user={ban.user} />
    </TableCell>
    <TableCell>
      {ms(ban.duration, { long: true })}
    </TableCell>
    <TableCell>
      {ban.reason || (
        <em>{t('admin.bans.noReason')}</em>
      )}
    </TableCell>
    <TableCell>
      <Username user={ban.moderator} />
    </TableCell>
    <TableCell>
      <RaisedButton
        onClick={onUnbanUser}
        label={t('admin.bans.unban')}
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
    moderator: PropTypes.object.isRequired,
  }).isRequired,
  onUnbanUser: PropTypes.func.isRequired,
};

export default enhance(BanRow);
