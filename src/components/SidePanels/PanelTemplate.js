import React from 'react';
import PropTypes from 'prop-types';
import TabTemplate from '../Tabs/TabTemplate';

const PanelTemplate = ({ selected, children }) => (
  <TabTemplate selected={selected} className="SidePanel-panel">
    {children}
  </TabTemplate>
);

PanelTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired
};

export default PanelTemplate;
