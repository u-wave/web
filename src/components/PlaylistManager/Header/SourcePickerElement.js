import cx from 'classnames';
import * as React from 'react';

const SourcePickerElement = ({
  className,
  name,
  source,
  active
}) => (
  <div
    className={cx(
      'SourcePickerElement',
      `SourcePickerElement--${name}`,
      active && 'SourcePickerElement--active',
      className
    )}
    style={{ backgroundImage: `url(${source.logo})` }}
  />
);

SourcePickerElement.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  source: React.PropTypes.shape({
    logo: React.PropTypes.string.isRequired
  }).isRequired,
  active: React.PropTypes.bool
};

export default SourcePickerElement;
