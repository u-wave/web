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
      'PanelButton',
      this.props.className,
      this.props.active ? 'PanelButton--active' : ''
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
