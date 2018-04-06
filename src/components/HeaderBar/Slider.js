// Copy-pasted from https://github.com/mui-org/material-ui/pull/10665

/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import ButtonBase from 'material-ui/ButtonBase';
import { fade } from 'material-ui/styles/colorManipulator';

export const style = theme => {
  const commonTransitionsOptions = {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeOut,
  };

  const commonTransitionsProperty = [
    'width',
    'height',
    'box-shadow',
    'left',
    'top',
    'background-color',
  ];

  const commonTransitions = theme.transitions.create(
    commonTransitionsProperty,
    commonTransitionsOptions,
  );

  const colors = {
    primary: theme.palette.primary.main,
    secondary: '#bdbdbd',
    focused: '#9e9e9e',
    disabled: '#bdbdbd',
  };

  return {
    /* Styles for wrapper container */
    container: {
      position: 'relative',
      width: '100%',
      padding: '16px 0',
      '&$reverse': {
        transform: 'scaleX(-1)',
      },
      '&$vertical': {
        position: 'relative',
        height: '100%',
        padding: '0 16px',
        '&$reverse': {
          transform: 'scaleY(-1)',
        },
      },
    },
    /* Tracks styles */
    track: {
      position: 'absolute',
      transform: 'translate(0, -50%)',
      top: '50%',
      height: 2,
      '&$vertical': {
        transform: 'translate(-50%, 0)',
        left: '50%',
        top: 'initial',
        width: 2,
      },
      '&$disabled': {
        backgroundColor: colors.secondary,
      },
    },
    trackBefore: {
      left: 0,
      backgroundColor: colors.primary,
      transition: commonTransitions,
      '&$vertical': {
        top: 0,
      },
    },
    trackAfter: {
      right: 0,
      backgroundColor: colors.secondary,
      transition: commonTransitions,
      '&$vertical': {
        bottom: 0,
      },
      '&$active': {
        backgroundColor: colors.focused,
      },
    },
    /* Thumb styles  */
    thumb: {
      position: 'absolute',
      zIndex: 1,
      transform: 'translate(-50%, -50%)',
      width: 12,
      height: 12,
      borderRadius: '50%',
      transition: commonTransitions,
      backgroundColor: colors.primary,
      '&:focus': {
        boxShadow: `0px 0px 0px 10px ${fade(colors.primary, 0.3)}`,
      },
      '&$active': {
        width: 18,
        height: 18,
        '&:focus': {
          boxShadow: 'none',
        },
        '&$initial': {
          border: `2px solid ${colors.focused}`,
        },
      },
      '&$disabled': {
        width: 10,
        height: 10,
        cursor: 'no-drop',
        backgroundColor: colors.disabled,
        '&:focus': {
          border: `2px solid ${colors.disabled}`,
          boxShadow: 'none',
        },
      },
      '&$initial': {
        border: `2px solid ${colors.disabled}`,
        backgroundColor: 'transparent',
        '&:focus': {
          border: `2px solid ${colors.focused}`,
          boxShadow: `0px 0px 0px 10px ${fade(colors.disabled, 0.3)}`,
        },
      },
    },
    initial: {},
    vertical: {},
    disabled: {},
    focus: {},
    active: {},
    reverse: {},
  };
};

const KEY_CODES = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  HOME: 36,
  END: 35,
};

function normalizeValue(value, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

const percentToValue = ({ percent, max, min }) => {
  return (max - min) * percent / 100 + min;
};

const roundToStep = ({ currentValue, newValue, step }) => {
  const diff = newValue - currentValue;

  if (Math.abs(diff) < step / 2) {
    return currentValue;
  }

  const remainder = diff > 0 ? step - newValue % step : -newValue % step;

  return newValue + remainder;
};

function getRelativeOffset(event) {
  const { scrollY, scrollX } = global;
  const { changedTouches, currentTarget } = event;
  const { pageX, pageY } = (changedTouches && changedTouches[0]) || event;
  const { left, top } = currentTarget.getBoundingClientRect();

  return {
    top: pageY - top - scrollY,
    left: pageX - left - scrollX,
  };
}

const calculatePercent = (event, vertical) => {
  const { currentTarget } = event;
  const { width, height } = currentTarget.getBoundingClientRect();

  const offset = getRelativeOffset(event);

  const position = vertical ? offset.top : offset.left;
  const size = vertical ? height : width;

  return position / (size / 100);
};

const timeout = delay => () => new Promise(resolve => setTimeout(resolve, delay));

class Slider extends React.Component {
  state = { isMove: false, isActive: false, isFocus: false };

  componentDidMount() {
    global.addEventListener('touchstart', this.touchStart, { passive: false });
  }

  componentWillReceiveProps(nextProps) {
    // If the value changes, then start the animation of thumb
    if (this.props.value !== nextProps.value && !this.state.isFocus) {
      this.activate()
        .then(timeout(this.props.theme.transitions.duration.complex))
        .then(this.deActivate);
    }
  }

  componentWillUnmount() {
    global.removeEventListener('touchstart', this.touchStart, { passive: false });
  }

  touchStart = event => {
    if (this.props.disabled || !this.state.isMove) {
      return;
    }

    event.preventDefault();
  };

  activate = () =>
    new Promise(resolve => {
      this.setState({ isActive: true }, resolve);
    });

  deActivate = () =>
    new Promise(resolve => {
      this.setState({ isActive: false }, resolve);
    });

  handleFocus = () => {
    this.setState({ isFocus: true }, () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.activate()
        .then(() => timeout(this.props.theme.transitions.duration.short))
        .then(this.deActivate);
    });
  };

  handleBlur = () => {
    this.setState({ isFocus: false });
  };

  handleClick = event => {
    if (this.props.disabled) {
      return;
    }

    const { min, max, step, value, reverse, vertical } = this.props;

    const percent = normalizeValue(
      reverse
        ? 100 - calculatePercent(event, vertical)
        : calculatePercent(event, vertical),
      min, max);

    const newValue = roundToStep({
      currentValue: value,
      newValue: percentToValue({ percent, max, min }),
      step,
    });

    if (typeof this.props.onChange === 'function' && value !== newValue) {
      this.props.onChange(event, newValue);
    }
  };

  handleKeyboard = event => {
    if (this.props.disabled) {
      return;
    }

    if (!Object.values(KEY_CODES).includes(event.keyCode)) {
      return;
    }

    event.preventDefault(); // Prevent scroll page by arrows

    const { ARROW_LEFT, ARROW_UP, HOME, END } = KEY_CODES;
    const { min, max, value, step, reverse } = this.props;

    if (event.keyCode === HOME) {
      this.props.onChange(event, min);
      return;
    }

    if (event.keyCode === END) {
      this.props.onChange(event, max);
      return;
    }

    const direction = [ARROW_LEFT, ARROW_UP].includes(event.keyCode) ? -1 : 1;
    const diff = step * direction * (reverse ? -1 : 1);
    const newValue = normalizeValue(value + diff, min, max);

    if (typeof this.props.onChange === 'function' && value !== newValue) {
      this.props.onChange(event, newValue);
    }
  };

  handleMouseDown = event => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ isMove: true, isActive: true });
    document.body.addEventListener('mouseup', this.handleMouseUp);

    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragStart(event);
    }
  };

  handleMouseUp = event => {
    if (this.props.disabled) {
      return;
    }

    document.body.removeEventListener('mouseup', this.handleMouseUp);

    this.setState({ isMove: false, isActive: false });

    if (typeof this.props.onDragEnd === 'function') {
      this.props.onDragEnd(event);
    }
  };

  handleMouseMove = event => {
    if (this.props.disabled || !this.state.isMove) {
      return;
    }

    const { min, max, step, value, reverse, vertical } = this.props;

    const percent = normalizeValue(
      reverse
        ? 100 - calculatePercent(event, vertical)
        : calculatePercent(event, vertical),
      min, max);

    const newValue = roundToStep({
      currentValue: value,
      newValue: percentToValue({ percent, max, min }),
      step,
    });

    if (typeof this.props.onChange === 'function' && value !== newValue) {
      this.props.onChange(event, newValue);
    }
  };

  render() {
    const { isActive, isFocus, isMove } = this.state;
    const {
      component: Component,
      classes,
      min,
      max,
      value,
      disabled,
      vertical,
      reverse,
      ...other
    } = this.props;

    const ariaProps = Object.keys(other).reduce((props, key) => {
      if (/aria-*/.test(key)) {
        Object.assign(props, {
          [key]: other[key],
        });
      }

      return props;
    }, {});

    const percent = normalizeValue((value - min) * 100 / (max - min));

    const containerClasses = classNames(classes.container, {
      [classes.vertical]: vertical,
      [classes.reverse]: reverse,
    });

    const trackBeforeClasses = classNames(classes.track, classes.trackBefore, {
      [classes.vertical]: vertical,
      [classes.disabled]: disabled,
    });

    const trackAfterClasses = classNames(classes.track, classes.trackAfter, {
      [classes.vertical]: vertical,
      [classes.active]: (isActive || isMove || isFocus) && !disabled,
      [classes.disabled]: disabled,
    });

    const thumbClasses = classNames(classes.thumb, {
      [classes.initial]: percent === 0,
      [classes.active]: isActive || isMove,
      [classes.disabled]: disabled,
    });

    const trackBeforeSize = `calc(${percent}% - ${disabled ? '7px' : '0px'})`;
    const trackAfterSize = `calc(${100 - percent}% - ${
      disabled || isActive || isMove ? '7px' : '5px'
    })`;
    const thumbPosition = `${percent}%`;

    const inlineTrackBeforeStyles = vertical
      ? { height: trackBeforeSize }
      : { width: trackBeforeSize };

    const inlineTrackAfterStyles = vertical
      ? { height: trackAfterSize }
      : { width: trackAfterSize };

    const inlineThumbStyles = vertical ? { top: thumbPosition } : { left: thumbPosition };

    return (
      <Component
        role="slider"
        className={containerClasses}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyboard}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
        onTouchEnd={this.handleMouseUp}
        onMouseUp={this.handleMouseUp}
        {...ariaProps}
      >
        <div className={trackBeforeClasses} style={inlineTrackBeforeStyles} />
        <ButtonBase
          className={thumbClasses}
          disableRipple
          style={inlineThumbStyles}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleMouseDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className={trackAfterClasses} style={inlineTrackAfterStyles} />
      </Component>
    );
  }
}

Slider.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the slider will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   */
  min: PropTypes.number,
  /**
   * Callback function that is fired when the slider's value changed.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the slide has stopped moving.
   */
  onDragEnd: PropTypes.func,
  /**
   * Callback function that is fired when the slider has begun to move.
   */
  onDragStart: PropTypes.func,
  /**
   * If `true`, the slider will be reversed.
   */
  reverse: PropTypes.bool,
  /**
   * The granularity the slider can step through values.
   */
  step: PropTypes.number,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The value of the slider.
   */
  value: PropTypes.number,
  /**
   * If `true`, the slider will be vertical.
   */
  vertical: PropTypes.bool,
};

Slider.defaultProps = {
  min: 0,
  max: 1,
  value: 0,
  step: 0.1,
  component: 'div',
};

export default withStyles(style, { name: 'MuiSlider', withTheme: true })(Slider);
