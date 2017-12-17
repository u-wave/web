import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component that handles the material-ui/Dialog close animation when a Dialog unmounts.
 */
export default class DialogCloseAnimation extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    delay: PropTypes.number.isRequired
  };

  state = {
    children: this.props.children
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.children) {
      this.clearTimeout();
      this.setState({
        children: nextProps.children
      });
    }
    if (this.state.children && !nextProps.children) {
      this.setState({
        children: React.cloneElement(this.props.children, {
          open: false
        })
      });

      this.timeout = setTimeout(() => {
        this.setState({
          children: null
        });
        this.timeout = null;
      }, this.props.delay);
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  timeout = null;

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    return this.state.children || null;
  }
}
