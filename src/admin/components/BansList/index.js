import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
// eslint-disable-next-line
import Table, {
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from 'material-ui/Table';
import BanRow from './Row';

const enhance = translate();

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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>{t('admin.bans.user')}</TableCell>
          <TableCell>{t('admin.bans.duration')}</TableCell>
          <TableCell>{t('admin.bans.reason')}</TableCell>
          <TableCell>{t('admin.bans.bannedBy')}</TableCell>
          <TableCell>{t('admin.bans.actions')}</TableCell>
        </TableRow>
      </TableHead>
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
  </React.Fragment>
);

BansList.propTypes = {
  t: PropTypes.func.isRequired,
  bans: PropTypes.array.isRequired,
  onUnbanUser: PropTypes.func.isRequired,
};

export default enhance(BansList);
