import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
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

const enhance = translate();

const BansList = ({
  t,
  bans,
  onUnbanUser
}) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <HeaderColumn>{t('admin.bans.user')}</HeaderColumn>
        <HeaderColumn>{t('admin.bans.duration')}</HeaderColumn>
        <HeaderColumn>{t('admin.bans.reason')}</HeaderColumn>
        <HeaderColumn>{t('admin.bans.bannedBy')}</HeaderColumn>
        <HeaderColumn>{t('admin.bans.actions')}</HeaderColumn>
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
