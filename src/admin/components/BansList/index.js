import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
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

function BansList({
  bans,
  count,
  pageSize,
  currentPage,
  onUnbanUser,
  onPageChange,
  onFilter,
}) {
  const { t } = useTranslator();

  return (
    <TableContainer>
      <Header>
        <span>Managing Bans:</span>
        <span style={{ float: 'right' }}>
          Filter User:
          <Filter onFilter={onFilter} />
        </span>
      </Header>
      <Table size="small">
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
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[pageSize]}
              page={currentPage}
              onPageChange={(_event, page) => onPageChange(page)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

BansList.propTypes = {
  bans: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onUnbanUser: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default BansList;
