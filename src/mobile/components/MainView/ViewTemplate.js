import * as React from 'react';
import TabTemplate from '../../../components/Tabs/TabTemplate';

const ViewTemplate = ({ selected, children }) => (
  <TabTemplate className="MobileView" selected={selected}>
    {children}
  </TabTemplate>
);

ViewTemplate.propTypes = {
  selected: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired
};

export default ViewTemplate;
