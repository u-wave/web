import * as React from 'react';

import EditMediaDialog from '../../containers/EditMediaDialog';
import LoginDialog from '../../containers/LoginDialog';

const Dialogs = () => (
  <div className="Dialogs">
    <EditMediaDialog />
    <LoginDialog />
  </div>
);

export default Dialogs;
