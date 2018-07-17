import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component that handles the material-ui/Dialog close animation when a Dialog unmounts.
 */
export default class DialogCloseAnimation extends React.Component {
  timeout = null;

  static propTypes = {
    children: PropTypes.element,
    delay: PropTypes.number.isRequired,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    children: this.props.children,
  };

  // TODO translate this to componentDidUpdate()?
  componentWillReceiveProps(nextProps) {
    const { delay } = this.props;
    const { children } = this.state;

    if (nextProps.children) {
      this.clearTimeout();
      this.setState({
        children: nextProps.children,
      });
    }

    if (children && !nextProps.children) {
      this.keepShowingChildren();

      this.timeout = setTimeout(() => {
        this.setState({
          children: null,
        });
        this.timeout = null;
      }, delay);
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  keepShowingChildren() {
    this.setState(({ children }) => ({
      children: React.cloneElement(children, {
        open: false,
      }),
    }));
  }

  render() {
    const { children } = this.state;

    return children || null;
  }
}
