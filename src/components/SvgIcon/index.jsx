import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'inline-block',
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  fontSize: '1.5rem',
};

function SvgIcon({ className, children, path }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style}>
      {children ?? <path d={path} />}
    </svg>
  );
}

SvgIcon.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(SvgIcon);
