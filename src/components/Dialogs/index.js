import React, { Component } from 'react';

import EditMediaDialog from '../../containers/EditMediaDialog';
import LoginDialog from '../../containers/LoginDialog';

export default class Dialogs extends Component {
  render() {
    return (
      <div className="Dialogs">
        <EditMediaDialog />
        <LoginDialog />
      </div>
    );
  }
}
