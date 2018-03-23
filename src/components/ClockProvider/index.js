import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTimer, stopTimer } from '../../actions/TickerActionCreators';

const mapDispatchToProps = {
  createTimer,
  stopTimer,
};

const enhance = connect(null, mapDispatchToProps);

class ClockProvider extends React.Component {
  static propTypes = {
    createTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    timerCallbacks: PropTypes.arrayOf(PropTypes.func),
  };

  getChildContext() {
    return {
      timerCallbacks: this.timerCallbacks,
    };
  }

  // TODO move this to constructor?
  componentWillMount() {
    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    this.timerCallbacks = this.props.createTimer();
  }

  componentWillUnmount() {
    this.timerCallbacks = [];
    this.props.stopTimer();
  }

  render() {
    return this.props.children;
  }
}

export default enhance(ClockProvider);
