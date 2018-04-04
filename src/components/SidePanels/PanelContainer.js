import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const PanelContainer = ({ selected, children }) => (
  <div className={cx('SidePanel-panel', selected && 'is-selected')}>
    {children}
  </div>
);

PanelContainer.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default PanelContainer;
