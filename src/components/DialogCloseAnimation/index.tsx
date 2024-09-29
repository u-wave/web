import React from 'react';
import PropTypes from 'prop-types';

type DialogCloseAnimationProps = {
  children: React.ReactElement | null | false | undefined,
  delay: number,
};

type DialogCloseAnimationState = {
  cachedChildren: React.ReactElement | null,
};

/**
 * Component that handles the material-ui/Dialog close animation when a Dialog unmounts.
 */
export default class DialogCloseAnimation extends React.Component<
  DialogCloseAnimationProps,
  DialogCloseAnimationState
> {
  timeout: ReturnType<typeof setTimeout> | null = null;

  static propTypes = {
    children: PropTypes.element,
    delay: PropTypes.number.isRequired,
  };

  constructor(props: DialogCloseAnimationProps) {
    super(props);

    const { children } = this.props;
    this.state = {
      cachedChildren: children || null,
    };
  }

  static getDerivedStateFromProps(
    nextProps: DialogCloseAnimationProps,
    prevState: DialogCloseAnimationState,
  ) {
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
