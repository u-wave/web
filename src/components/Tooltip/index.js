import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import MuiTooltip from 'material-ui/internal/Tooltip';

/**
 * Wrapper for material-ui Tooltips with better center-alignment on things that
 * are not IconButtons, and auto-realignment when close to the window border in
 * order to prevent overflow.
 */

class Tooltip extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    show: PropTypes.bool,
    /**
     * Desired horizontal position of the tooltip.
     */
    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
  };

  state = {
    /**
     * Overflow-prevented horizontal position of the tooltip.
     */
    horizontalPosition: this.props.horizontalPosition,
    /**
     * Whether the tooltip element is currently in the DOM.
     */
    insert: this.props.show,
    /**
     * Whether the tooltip element is currently visible.
     */
    show: this.props.show,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.show();
    }

    if (this.props.show && !nextProps.show) {
      this.hide();
    }
  }

  /**
   * Clear the fade-out animation timeout.
   */
  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  /**
   * Show the tooltip.
   */
  show() {
    this.clearTimeout();
    this.setState({ insert: true }, () => {
      this.position();
      this.setState({ show: true });
    });
  }

  /**
   * Hide the tooltip.
   */
  hide() {
    if (this.timeout) {
      return;
    }

    // First hide it,
    this.setState({ show: false }, () => {
      // Then wait for the fade-out animation,
      this.timeout = setTimeout(() => {
        // And finally remove the element.
        this.setState({
          insert: false,
          // The horizontal position is reset here, so that the next time the
          // tooltip is shown, the positioning checks run on the original
          // position. Otherwise, it might getBoundingClientRect() from an
          // already-repositioned element, discover that it is fits, and go back
          // to the initial state even if it did not fit.
          horizontalPosition: this.props.horizontalPosition,
        });
      }, 450);
    });
  }

  /**
   * Reposition the tooltip if it is close to the window border.
   */
  position() {
    if (!this.tooltip) {
      return;
    }

    // eslint-disable-next-line react/no-find-dom-node
    const rect = findDOMNode(this.tooltip).getBoundingClientRect();
    this.setState({
      horizontalPosition: rect.right > window.innerWidth ? 'left' :
        this.props.horizontalPosition,
    });
  }

  refTooltip = (tooltip) => {
    this.tooltip = tooltip;
  };

  render() {
    const { insert, show } = this.state;
    return (
      <div className="u-TooltipFix">
        {insert && (
          <MuiTooltip
            ref={this.refTooltip}
            {...this.props}
            show={show}
            horizontalPosition={this.state.horizontalPosition}
            style={{
              // "pointer-events: none" avoids interference with tooltips  that
              // are very close to or overlay other elements that have tooltips.
              pointerEvents: 'none',
              ...this.props.style,
            }}
          />
        )}
      </div>
    );
  }
}

export default Tooltip;
