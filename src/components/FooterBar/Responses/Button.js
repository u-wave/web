import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    count: PropTypes.number
  };

  render() {
    const { count, children, ...props } = this.props;
    return (
      <div
        className="ResponseButton"
      >
        <IconButton
          tooltipPosition="top-center"
          style={{
            height: 36,
            width: 36,
            padding: '6px 12px 6px 0'
          }}
          {...props}
        >
          {children}
        </IconButton>
        <span className="ResponseButton-count">{count}</span>
      </div>
    );
  }
}
