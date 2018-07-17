import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createTimer as createTimerAction,
  stopTimer as stopTimerAction,
} from '../../actions/TickerActionCreators';

const mapDispatchToProps = {
  createTimer: createTimerAction,
  stopTimer: stopTimerAction,
};

const enhance = connect(null, mapDispatchToProps);

class ClockProvider extends React.Component {
  timerCallbacks = {
    add: cb => this.setState(s => ({
      callbacks: s.callbacks.concat(cb),
    })),
    remove: cb => this.setState(s => ({
      callbacks: s.callbacks.filter(cb1 => cb1 !== cb),
    })),
  };

  static propTypes = {
    createTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    timerCallbacks: PropTypes.shape({
      add: PropTypes.func,
      remove: PropTypes.func,
    }),
  };

  state = { callbacks: [] };

  getChildContext() {
    return {
      timerCallbacks: this.timerCallbacks,
    };
  }

  componentDidMount() {
    const { createTimer } = this.props;
    const { callbacks } = this.state;

    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    createTimer(() => {
      callbacks.forEach(cb => cb());
    });
  }

  componentWillUnmount() {
    const { stopTimer } = this.props;

    stopTimer();
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default enhance(ClockProvider);
