import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import withProps from 'recompose/withProps';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from '../../../components/Table';
import UserRow from './Row';

const avatarStyle = {
  width: 48,
  paddingRight: 0,
};
const actionsStyle = {
  width: 48,
  paddingLeft: 0,
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

const enhance = translate();

const UsersList = ({
  t,
  users,
}) => (
  <React.Fragment>
    <Header>
      <span>Managing Users:</span>
      <span style={{ float: 'right' }}>
        Filter User:
        <Filter />
      </span>
    </Header>
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn style={avatarStyle} />
          <TableHeaderColumn>{t('admin.users.user')}</TableHeaderColumn>
          <TableHeaderColumn>{t('admin.users.joinedAt')}</TableHeaderColumn>
          <TableHeaderColumn>{t('admin.users.email')}</TableHeaderColumn>
          <TableHeaderColumn>{t('admin.users.roles')}</TableHeaderColumn>
          <TableHeaderColumn style={actionsStyle} />
        </TableRow>
      </TableHeader>
      <TableBody stripedRows>
        {users.map(user => (
          <UserRow user={user} />
        ))}
      </TableBody>
    </Table>
  </React.Fragment>
);

UsersList.propTypes = {
  t: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default enhance(UsersList);
