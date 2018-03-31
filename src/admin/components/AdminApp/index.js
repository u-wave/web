import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from '../../../components/List';
import CurrentPage from './CurrentPage';

import '../../index.css';

const AdminApp = ({
  currentView,
  onTransition,
}) => (
  <div className="AdminApp">
    <div className="AdminApp-menu">
      <List>
        <ListItem
          selected={currentView === 'main'}
          className="AdminApp-menuItem"
          onClick={() => onTransition('main')}
        >
          <ListItemText>Main</ListItemText>
        </ListItem>
        <ListItem
          selected={currentView === 'users'}
          className="AdminApp-menuItem"
          onClick={() => onTransition('users')}
        >
          <ListItemText>Users</ListItemText>
        </ListItem>
        <ListItem
          selected={currentView === 'bans'}
          className="AdminApp-menuItem"
          onClick={() => onTransition('bans')}
        >
          <ListItemText>Bans</ListItemText>
        </ListItem>
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
