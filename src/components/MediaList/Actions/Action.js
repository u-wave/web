import React, { Component, PropTypes } from 'react';

export default class Action extends Component {
  static propTypes = {
    children: PropTypes.element,
    onAction: PropTypes.func
  };

  render() {
    const { children, onAction, ...attrs } = this.props;
    return (
      <div
        className="MediaActions-action"
        onClick={onAction}
        {...attrs}
      >
        {children}
      </div>
    );
  }
}
