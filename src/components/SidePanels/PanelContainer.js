import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

const PanelContainer = ({ selected, children }) => (
  <div className={cx('SidePanel-panel', 'AppRow--middle', selected && 'is-selected')} hidden={!selected}>
    {children}
  </div>
);

PanelContainer.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default PanelContainer;
