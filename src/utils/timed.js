import React from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { currentTimeSelector } from '../selectors/timeSelectors';

export default function () {
  return (Component) => {
    class Timed extends React.Component {
      static displayName = wrapDisplayName(Component, 'Timed');

      static contextTypes = {
        store: PropTypes.object.isRequired,
        timerCallbacks: PropTypes.shape({
          add: PropTypes.func,
          remove: PropTypes.func,
        }).isRequired,
      };

      state = {
        currentTime: this.getCurrentTime(),
      };

      componentDidMount() {
        const { timerCallbacks } = this.context;

        timerCallbacks.add(this.tick);
      }

      componentWillUnmount() {
        const { timerCallbacks } = this.context;

        timerCallbacks.remove(this.tick);
      }

      getCurrentTime() {
        const { store } = this.context;

        return currentTimeSelector(store.getState());
      }

      tick = () => {
        this.setState({
          currentTime: this.getCurrentTime(),
        });
      };

      render() {
        const { currentTime } = this.state;

        return (
          <Component
            {...this.props}
            currentTime={currentTime}
          />
        );
      }
    }
    return Timed;
  };
}
