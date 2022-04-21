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

  constructor(props) {
    super(props);

    const { children } = this.props;
    this.state = {
      cachedChildren: children,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children } = nextProps;
    const { cachedChildren } = prevState;

    if (children) {
      return { cachedChildren: children };
    }

    if (!children && cachedChildren) {
      return {
        cachedChildren: React.cloneElement(cachedChildren, {
          open: false,
        }),
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { children, delay } = this.props;
    const { cachedChildren } = this.state;

    if (children) {
      this.clearTimeout();
    }

    if (cachedChildren && !children) {
      this.timeout = setTimeout(() => {
        this.setState({
          cachedChildren: null,
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

  render() {
    const { cachedChildren } = this.state;

    return cachedChildren;
  }
}
