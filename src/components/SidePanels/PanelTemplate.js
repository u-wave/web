import cx from 'classnames';
import * as React from 'react';

const PanelTemplate = ({ selected, children }) => (
  <div className={cx('SidePanel-panel', selected && 'is-visible')}>
    {children}
  </div>
);

PanelTemplate.propTypes = {
  children: React.PropTypes.node.isRequired,
  selected: React.PropTypes.bool.isRequired
};

export default PanelTemplate;
