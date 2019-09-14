import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BanRow from './Row';

const headerStyle = {
  background: '#9d2053',
  padding: '12px 24px',
  lineHeight: '35px',
};
function Header(props) {
  return <div style={headerStyle} {...props} />;
}

const filterStyle = {
  background: '#631032',
  color: '#ffffff',
  border: 0,
  marginLeft: 12,
  paddingLeft: 12,
  height: 35,
};
function Filter(props) {
  return <input type="text" style={filterStyle} {...props} />;
}

function BansList({ bans, onUnbanUser }) {
  const { t } = useTranslator();
  return (
    <>
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
          {bans.map((ban) => (
            <BanRow
              key={ban.user._id}
              ban={ban}
              onUnbanUser={() => onUnbanUser(ban.user)}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

BansList.propTypes = {
  bans: PropTypes.array.isRequired,
  onUnbanUser: PropTypes.func.isRequired,
};

export default BansList;
