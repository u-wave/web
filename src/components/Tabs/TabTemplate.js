import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const TabTemplate = ({ className, selected, children }) => (
  <div className={cx('Tabs-panel', className, selected && 'is-visible')}>
    {children}
  </div>
);

TabTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool.isRequired,
  className: PropTypes.string
};

export default TabTemplate;
