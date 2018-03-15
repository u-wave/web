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
        timerCallbacks: PropTypes.arrayOf(PropTypes.func).isRequired,
      };

      state = {
        currentTime: this.getCurrentTime(),
      };

      componentDidMount() {
        this.context.timerCallbacks.push(this.tick);
      }

      componentWillUnmount() {
        const { timerCallbacks } = this.context;
        const index = timerCallbacks.indexOf(this.tick);
        if (index !== -1) {
          timerCallbacks.splice(index, 1);
        }
      }

      getCurrentTime() {
        return currentTimeSelector(this.context.store.getState());
      }

      tick = () => {
        this.setState({
          currentTime: this.getCurrentTime(),
        });
      };

      render() {
        return (
          <Component
            {...this.props}
            currentTime={this.state.currentTime}
          />
        );
      }
    }
    return Timed;
  };
}
