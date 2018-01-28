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
  large: 1.6,
  tiny: 2.6
};

const CircularProgress = ({ size = 'large' }) => (
  <div
    className={cx('MuiCircularProgress', `MuiCircularProgress--${size}`)}
    role="progressbar"
  >
    <svg className="MuiCircularProgress-svg" viewBox="0 0 50 50">
      <circle
        className="MuiCircularProgress-circle"
        cx={25}
        cy={25}
        r={20}
        fill="none"
        strokeWidth={THICKNESS[size]}
      />
    </svg>
  </div>
);

CircularProgress.propTypes = {
  size: PropTypes.string
};

export default CircularProgress;
