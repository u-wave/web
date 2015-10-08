import cx from 'classnames';
import React from 'react';

const Icon = ({ name, className, ...props }) => {
  return (
    <i
      className={cx('material-icons', 'Icon', `Icon--${name}`, className)}
      { ...props }
    >
      {name}
    </i>
  );
};

export default Icon;
