/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';

const buttonStyle = {
  height: 36,
  width: 36,
  padding: '6px 12px 6px 0'
};

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    count: PropTypes.number
  };

  render() {
    const { count, children, ...props } = this.props;
    return (
      <div className="ResponseButton">
        <IconButton
          tooltipPosition="top-center"
          style={buttonStyle}
          {...props}
        >
          {children}
        </IconButton>
        <span className="ResponseButton-count">{count}</span>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
