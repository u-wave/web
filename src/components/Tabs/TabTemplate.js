import cx from 'classnames';
import * as React from 'react';

const TabTemplate = ({ className, selected, children }) => (
  <div className={cx('Tabs-panel', className, selected && 'is-visible')}>
    {children}
  </div>
);

TabTemplate.propTypes = {
  children: React.PropTypes.node.isRequired,
  selected: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string
};

export default TabTemplate;
