import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import List, { ListItem, ListItemText } from '../../../components/List';
import CurrentPage from './CurrentPage';
import '../../index.css';

const Fallback = () => <CircularProgress size="100%" />;

const {
  useEffect,
  useState,
  useTransition,
} = React;

function AdminApp({ currentView, onTransition }) {
  const [nextView, setNextView] = useState(currentView);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (currentView === nextView) {
      return;
    }

    startTransition(() => {
      onTransition(nextView);
    });
  }, [onTransition, currentView, nextView]);

  return (
    <div className="AdminApp">
      <div className="AdminApp-menu">
        <List>
          <ListItem
            selected={currentView === 'main'}
            className="AdminApp-menuItem"
            onClick={() => setNextView('main')}
          >
            <ListItemText primary="Main" />
            {nextView === 'main' && isPending ? (
              <ListItemIcon>
                <CircularProgress color="inherit" size={24} />
              </ListItemIcon>
            ) : null}
          </ListItem>
          <ListItem
            selected={currentView === 'users'}
            className="AdminApp-menuItem"
            onClick={() => setNextView('users')}
          >
            <ListItemText primary="Users" />
            {nextView === 'users' && isPending ? (
              <ListItemIcon>
                <CircularProgress color="inherit" size={24} />
              </ListItemIcon>
            ) : null}
          </ListItem>
          <ListItem
            selected={currentView === 'bans'}
            className="AdminApp-menuItem"
            onClick={() => setNextView('bans')}
          >
            <ListItemText primary="Bans" />
            {nextView === 'bans' && isPending ? (
              <ListItemIcon>
                <CircularProgress color="inherit" size={24} />
              </ListItemIcon>
            ) : null}
          </ListItem>
          <ListItem
            selected={currentView === 'config'}
            className="AdminApp-menuItem"
            onClick={() => setNextView('config')}
          >
            <ListItemText primary="Server Config" />
            {nextView === 'config' && isPending ? (
              <ListItemIcon>
                <CircularProgress color="inherit" size={24} />
              </ListItemIcon>
            ) : null}
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
}

AdminApp.propTypes = {
  currentView: PropTypes.string.isRequired,
  onTransition: PropTypes.func.isRequired,
};

export default AdminApp;
