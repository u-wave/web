import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const PanelContainer = ({ selected, children, keepMounted }) => (
  <div className={cx('SidePanel-panel', selected && 'is-selected')}>
    {(keepMounted || selected) ? children : null}
  </div>
);

PanelContainer.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
  keepMounted: PropTypes.bool,
};

export default PanelContainer;
