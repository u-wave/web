import * as React from 'react';

const PanelTemplate = ({ selected, children }) => (
  <div style={{ display: selected ? 'block' : 'none' }}>
    {children}
  </div>
);

PanelTemplate.propTypes = {
  children: React.PropTypes.node.isRequired,
  selected: React.PropTypes.bool.isRequired
};

export default PanelTemplate;
