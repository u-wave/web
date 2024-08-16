import Alert from '@mui/material/Alert';
import Motd from '../../containers/Motd';

function Main() {
  return (
    <div>
      <Alert severity="warning">
        The admin interface is not yet done and most things do not work.
      </Alert>
      <Motd />
    </div>
  );
}

export default Main;
