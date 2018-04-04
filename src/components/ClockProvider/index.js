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
    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    this.props.createTimer(() => {
      this.state.callbacks.forEach(cb => cb());
    });
  }

  componentWillUnmount() {
    this.props.stopTimer();
  }

  timerCallbacks = {
    add: cb => this.setState(s => ({
      callbacks: s.callbacks.concat(cb),
    })),
    remove: cb => this.setState(s => ({
      callbacks: s.callbacks.filter(cb1 => cb1 !== cb),
    })),
  };

  render() {
    return this.props.children;
  }
}

export default enhance(ClockProvider);
