import React from 'react';
import PropTypes from 'prop-types';
import TabTemplate from '../../../components/Tabs/TabTemplate';

const ViewTemplate = ({ selected, children }) => (
  <TabTemplate className="MobileView" selected={selected}>
    {children}
  </TabTemplate>
);

ViewTemplate.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ViewTemplate;
