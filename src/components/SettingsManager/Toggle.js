import React from 'react';
import Toggle from 'material-ui/Toggle';

const SToggle = props => (
  <div className="SettingsPanel-toggle">
    <Toggle
      labelPosition="left"
      {...props}
    />
  </div>
);

export default SToggle;
