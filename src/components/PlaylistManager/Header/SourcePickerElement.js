import cx from 'classnames';
import * as React from 'react';

const SourcePickerElement = ({
  className,
  name,
  active,
  onSelect
}) => (
  <div
    className={cx(
      'SourcePickerElement',
      `SourcePickerElement--${name}`,
      active && 'SourcePickerElement--active',
      className
    )}
    onClick={onSelect}
  />
);

SourcePickerElement.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
  onSelect: React.PropTypes.func
};

export default SourcePickerElement;
