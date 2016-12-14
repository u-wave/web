import * as React from 'react';
import TabTemplate from '../Tabs/TabTemplate';

const PanelTemplate = ({ selected, children }) => (
  <TabTemplate selected={selected} className="SidePanel-panel">
    {children}
  </TabTemplate>
);

PanelTemplate.propTypes = {
  children: React.PropTypes.node.isRequired,
  selected: React.PropTypes.bool.isRequired
};

export default PanelTemplate;
