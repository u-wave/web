import React from 'react';

const PanelTemplate = ({ selected, children }) => (
  <div style={{ display: selected ? 'block' : 'none' }}>
    {children}
  </div>
);

export default PanelTemplate;
