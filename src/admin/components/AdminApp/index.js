import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import List, { ListItem, ListItemText } from '../../../components/List';
import CurrentPage from './CurrentPage';
import '../../index.css';

const {
  useEffect,
  useState,
  useTransition,
} = React;

const Fallback = () => <CircularProgress size="100%" />;
const Pending = () => (
  <ListItemIcon>
    <CircularProgress color="inherit" size={24} />
  </ListItemIcon>
);

function AdminApp() {
  const [currentView, setCurrentView] = useState('main');
  const [nextView, setNextView] = useState(currentView);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (currentView === nextView) {
      return;
    }

    startTransition(() => {
      setCurrentView(nextView);
    });
  }, [currentView, nextView]);

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
            {nextView === 'main' && isPending ? <Pending /> : null}
          </ListItem>
          <ListItem
            selected={currentView === 'users'}
            className="AdminApp-menuItem"
            onClick={() => setNextView('users')}
          >
            <ListItemText primary="Users" />
            {nextView === 'users' && isPending ? <Pending /> : null}
          </ListItem>
          <ListItem
            selected={currentView === 'bans'}
            className="AdminApp-menuItem"
            onClick={() => setNextView('bans')}
          >
            <ListItemText primary="Bans" />
            {nextView === 'bans' && isPending ? <Pending /> : null}
          </ListItem>
          <ListItem
            selected={currentView === 'config'}
            className="AdminApp-menuItem"
            onClick={() => setNextView('config')}
          >
            <ListItemText primary="Server Config" />
            {nextView === 'config' && isPending ? <Pending /> : null}
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

export default AdminApp;
