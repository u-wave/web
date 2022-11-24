import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'inline-block',
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  fontSize: '1.5rem',
};

function SvgIcon({ className, path }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style}>
      <path d={path} />
    </svg>
  );
}

SvgIcon.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
};

export default React.memo(SvgIcon);
