import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createTimer as createTimerAction,
  stopTimer as stopTimerAction,
} from '../actions/TickerActionCreators';

const mapDispatchToProps = {
  createTimer: createTimerAction,
  stopTimer: stopTimerAction,
};

const enhance = connect(null, mapDispatchToProps);

const ClockContext = React.createContext(null);

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

  state = { callbacks: [] };

  componentDidMount() {
    const { createTimer } = this.props;

    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    createTimer(() => {
      const { callbacks } = this.state;

      callbacks.forEach(cb => cb());
    });
  }

  componentWillUnmount() {
    const { stopTimer } = this.props;

    stopTimer();
  }

  render() {
    const { children } = this.props;
    const { timerCallbacks } = this;

    return (
      <ClockContext.Provider value={timerCallbacks}>
        {children}
      </ClockContext.Provider>
    );
  }
}

export default {
  Consumer: ClockContext.Consumer,
  Provider: enhance(ClockProvider),
};
