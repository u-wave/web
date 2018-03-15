import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from '../../../components/Table';
import BanRow from './Row';

const enhance = translate();
const avatarStyle = {
  width: 48,
  paddingRight: 0,
};

const Header = withProps({
  style: {
    background: '#9d2053',
    padding: '12px 24px',
    lineHeight: '35px',
  },
})('div');

const Filter = withProps({
  style: {
    background: '#631032',
    color: '#ffffff',
    border: 0,
    marginLeft: 12,
    paddingLeft: 12,
    height: 35,
  },
  type: 'text',
})('input');

const BansList = ({
  t,
  bans,
  onUnbanUser,
}) => (
  <React.Fragment>
    <Header>
      <span>Managing Bans:</span>
      <span style={{ float: 'right' }}>
        Filter User:
        <Filter />
      </span>
    </Header>
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
  </React.Fragment>
);

BansList.propTypes = {
  t: PropTypes.func.isRequired,
  bans: PropTypes.array.isRequired,
  onUnbanUser: PropTypes.func.isRequired,
};

export default enhance(BansList);
