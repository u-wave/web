import cx from 'classnames';
import find from 'array-find';
import React from 'react';

const PanelGroup = ({ children, className, selected }) => {
  const view = find(children, child => child.props.name === selected);
  return (
    <div className={cx('PanelGroup', className)}>
      {view}
    </div>
  );
};

export default PanelGroup;
