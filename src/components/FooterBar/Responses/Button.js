import cx from 'classnames';
import * as React from 'react';
import Tooltip from '../../Tooltip';

export default class Button extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired,
    disabled: React.PropTypes.bool,
    count: React.PropTypes.number,
    tooltip: React.PropTypes.string
  };

  state = { showTooltip: false };

  handleMouseEnter = () => {
    this.setState({ showTooltip: true });
  };

  handleMouseLeave = () => {
    this.setState({ showTooltip: false });
  };

  render() {
    const {
      onClick,
      disabled,
      count,
      children,
      tooltip
    } = this.props;
    // Buttons are fake-disabled because mouseleave acts inconsistently with
    // tooltips and actually-disabled buttons, sometimes leaving the tooltip
    // lingering. The cursor and hover effects are removed by the
    // ResponseButton--disabled classname, and the click handler is simply not
    // added.
    return (
      <button
        className={cx('ResponseButton', disabled && 'ResponseButton--disabled')}
        onClick={disabled ? null : onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="ResponseButton-content">
          <Tooltip
            label={tooltip}
            verticalPosition="top"
            horizontalPosition="center"
            show={this.state.showTooltip}
            style={{ top: -22 }}
          />
          <div className="ResponseButton-icon">{children}</div>
          <span className="ResponseButton-count">{count}</span>
        </div>
      </button>
    );
  }
}
