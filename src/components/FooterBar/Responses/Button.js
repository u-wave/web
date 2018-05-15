import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

/* eslint-disable */
const Button = ({
  onClick,
  disabled,
  count,
  children,
  tooltip,
}) => (
  // Wrapped in a <div> so the tooltip can listen for mouse events.
  <Tooltip title={tooltip} placement="top">
    <div className="ResponseButton-wrap">
      <button
        className={cx('ResponseButton', disabled && 'ResponseButton--disabled')}
        disabled={disabled}
        onClick={onClick}
      >
        <div className="ResponseButton-content">
          <div className="ResponseButton-icon">{children}</div>
          <span className="ResponseButton-count">{count}</span>
        </div>
      </button>
    </div>
  </Tooltip>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
  count: PropTypes.number,
  tooltip: PropTypes.string,
};

export default Button;
