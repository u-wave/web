import React, { Component } from 'react';

import EditMediaDialog from '../../containers/EditMediaDialog';
import LoginDialog from '../../containers/LoginModal';

export default class Dialogs extends Component {
  render() {
    return (
      <div>
        <EditMediaDialog />
        <LoginDialog />
      </div>
    );
  }
}
