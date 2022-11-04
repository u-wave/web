import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import List, { ListItem, ListItemText } from '../../../components/List';
import CurrentPage from './CurrentPage';
import '../../index.css';

const Fallback = () => <CircularProgress size="100%" />;

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
          <ListItemText primary="Main" />
        </ListItem>
        <ListItem
          selected={currentView === 'users'}
          className="AdminApp-menuItem"
          onClick={() => onTransition('users')}
        >
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem
          selected={currentView === 'bans'}
          className="AdminApp-menuItem"
          onClick={() => onTransition('bans')}
        >
          <ListItemText primary="Bans" />
        </ListItem>
        <ListItem
          selected={currentView === 'config'}
          className="AdminApp-menuItem"
          onClick={() => onTransition('config')}
        >
          <ListItemText primary="Server Config" />
        </ListItem>
      </List>
    </div>
    <div className="AdminApp-page">
      <React.Suspense fallback={<Fallback />}>
        <CurrentPage page={currentView} />
      </React.Suspense>
    </div>
  </div>
);

AdminApp.propTypes = {
  currentView: PropTypes.string.isRequired,
  onTransition: PropTypes.func.isRequired,
};

export default AdminApp;
