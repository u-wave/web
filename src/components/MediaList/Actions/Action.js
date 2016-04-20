/* eslint-disable react/prefer-stateless-function */
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
        role="button"
        className="MediaActions-action"
        onClick={onAction}
        {...attrs}
      >
        {children}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
