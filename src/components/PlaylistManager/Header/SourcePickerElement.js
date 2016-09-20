import cx from 'classnames';
import * as React from 'react';

const SourcePickerElement = ({
  className,
  name,
  active
}) => (
  <div
    className={cx(
      'SourcePickerElement',
      `SourcePickerElement--${name}`,
      active && 'SourcePickerElement--active',
      className
    )}
  />
);

SourcePickerElement.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool
};

export default SourcePickerElement;
