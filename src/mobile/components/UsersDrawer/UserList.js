import * as React from 'react';
import { translate } from 'react-i18next';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import UserRow from './UserRow';

const UserList = ({
  t,
  users,
  waitlist
}) => (
  <div>
    <List>
      <Subheader>{t('waitlist.title')}</Subheader>
      {waitlist.map((user, position) => (
        <UserRow
          key={user._id}
          user={user}
          waitlistPosition={position + 1}
        />
      ))}
    </List>
    <Divider />
    <List>
      <Subheader>{t('users.title')}</Subheader>
      {users.map(user => (
        <UserRow key={user._id} user={user} />
      ))}
    </List>
  </div>
);

UserList.propTypes = {
  t: React.PropTypes.func.isRequired,
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  waitlist: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default translate()(UserList);
