import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import CurrentPage from './CurrentPage';

import './index.css';

const AdminApp = ({
  currentView,
  onTransition
}) => (
  <div className="AdminApp">
    <div className="AdminApp-menu">
      <List>
        <ListItem
          onClick={() => onTransition('main')}
          className={cx('AdminApp-menuItem', currentView === 'main' && 'is-selected')}
          primaryText="Main"
        />
        <ListItem
          onClick={() => onTransition('users')}
          className={cx('AdminApp-menuItem', currentView === 'users' && 'is-selected')}
          primaryText="Users"
        />
        <ListItem
          onClick={() => onTransition('bans')}
          className={cx('AdminApp-menuItem', currentView === 'bans' && 'is-selected')}
          primaryText="Bans"
        />
      </List>
    </div>
    <div className="AdminApp-page">
      <CurrentPage page={currentView} />
    </div>
  </div>
);

AdminApp.propTypes = {
  currentView: PropTypes.string.isRequired,
  onTransition: PropTypes.func.isRequired
};

export default AdminApp;
