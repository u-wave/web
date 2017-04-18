/**
 * The CircularProgress component from material-ui v1.0. We use this one instead
 * of the one from v0.x, because this one is CSS-only!
 *
 * Adapted from:
 * https://github.com/callemall/material-ui/blob/next/src/Progress/CircularProgress.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const THICKNESS = {
  large: 3.6,
  tiny: 10
};

const CircularProgress = ({ size = 'large' }) => (
  <div className={cx('MuiCircularProgress', `MuiCircularProgress--${size}`)}>
    <svg className="MuiCircularProgress-svg" viewBox="0 0 100 100">
      <circle
        className="MuiCircularProgress-circle"
        cx={50}
        cy={50}
        r={50 - (THICKNESS[size] / 2)}
        fill="none"
        strokeWidth={THICKNESS[size]}
        strokeMiterlimit="20"
      />
    </svg>
  </div>
);

CircularProgress.propTypes = {
  size: PropTypes.string
};

export default CircularProgress;
