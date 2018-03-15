import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const SourcePickerElement = ({
  className,
  name,
  source,
  active,
}) => (
  <div
    className={cx(
      'SourcePickerElement',
      `SourcePickerElement--${name}`,
      active && 'SourcePickerElement--active',
      className,
    )}
    style={{ backgroundImage: `url(${source.logo})` }}
  />
);

SourcePickerElement.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  source: PropTypes.shape({
    logo: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool,
};

export default SourcePickerElement;
