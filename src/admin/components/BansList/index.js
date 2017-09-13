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
import BanRow from './Row';

const enhance = translate();
const avatarStyle = { width: 24 };

const BansList = ({
  t,
  bans,
  onUnbanUser
}) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn style={avatarStyle} />
        <TableHeaderColumn>{t('admin.bans.user')}</TableHeaderColumn>
        <TableHeaderColumn>{t('admin.bans.duration')}</TableHeaderColumn>
        <TableHeaderColumn>{t('admin.bans.reason')}</TableHeaderColumn>
        <TableHeaderColumn>{t('admin.bans.bannedBy')}</TableHeaderColumn>
        <TableHeaderColumn>{t('admin.bans.actions')}</TableHeaderColumn>
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
  t: PropTypes.func.isRequired,
  bans: PropTypes.array.isRequired,
  onUnbanUser: PropTypes.func.isRequired
};

export default enhance(BansList);
