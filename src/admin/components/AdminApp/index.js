import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '../../../components/List';
import CurrentPage from './CurrentPage';

import './index.css';

const AdminApp = ({
  currentView,
  onTransition,
}) => (
  <div className="AdminApp">
    <div className="AdminApp-menu">
      <List>
        <ListItem
          primaryText="Main"
          className={cx('AdminApp-menuItem', currentView === 'main' && 'is-selected')}
          selected={currentView === 'main'}
          onClick={() => onTransition('main')}
        />
        <ListItem
          primaryText="Users"
          className={cx('AdminApp-menuItem', currentView === 'users' && 'is-selected')}
          selected={currentView === 'users'}
          onClick={() => onTransition('users')}
        />
        <ListItem
          primaryText="Bans"
          className={cx('AdminApp-menuItem', currentView === 'bans' && 'is-selected')}
          selected={currentView === 'bans'}
          onClick={() => onTransition('bans')}
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
  onTransition: PropTypes.func.isRequired,
};

export default AdminApp;
