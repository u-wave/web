import React from 'react';
import Motd from '../../containers/Motd';

const Main = () => (
  <div>
    <p>
      Note that the admin interface is not yet done and most things do not work.
      You can, however, configure the message of the day! :P
    </p>
    <Motd />
  </div>
);

Main.propTypes = {};

export default Main;
