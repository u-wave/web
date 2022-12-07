import React from 'react';

import EditMediaDialog from '../../containers/EditMediaDialog';
import LoginDialog from '../../containers/LoginDialog';
import PreviewMediaDialog from '../../containers/PreviewMediaDialog';

const Dialogs = () => (
  <div className="Dialogs">
    <EditMediaDialog />
    <LoginDialog />
    <PreviewMediaDialog />
  </div>
);

export default Dialogs;
