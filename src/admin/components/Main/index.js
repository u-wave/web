import React from 'react';
import Alert from '@material-ui/core/Alert';
import Motd from '../../containers/Motd';

const Main = () => (
  <div>
    <Alert severity="warning">
      The admin interface is not yet done and most things do not work.
    </Alert>
    <Motd />
  </div>
);

Main.propTypes = {};

export default Main;
