import {
  Suspense, lazy, useEffect, useState, useTransition,
} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import List, { ListItem, ListItemText } from '../../../components/List';
import Main from '../Main';
import '../../index.css';

function Fallback() {
  return <CircularProgress size="100%" />;
}

function Pending() {
  return (
    <ListItemIcon>
      <CircularProgress color="inherit" size={24} />
    </ListItemIcon>
  );
}

const pages = {
  main: Main,
  users: lazy(() => import('../../containers/UsersList')),
  bans: lazy(() => import('../../containers/BansList')),
  config: lazy(() => import('../../containers/ServerConfig')),
};

function AdminApp() {
  const [currentView, setCurrentView] = useState<keyof typeof pages>('main');
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

  const CurrentPage = pages[currentView];

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
        <Suspense fallback={<Fallback />}>
          <CurrentPage />
        </Suspense>
      </div>
    </div>
  );
}

export default AdminApp;
