import cx from 'classnames';
import React from 'react';

export default class Button extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  render() {
    const className = cx(
      'Button',
      this.props.className,
      this.props.active ? 'Button--active' : ''
    );
    return (
      <div
        className={className}
        onClick={this.props.onClick}
      >
        {this.props.text.toUpperCase()}
      </div>
    );
  }
}
