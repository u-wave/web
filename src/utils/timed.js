import * as React from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { currentTimeSelector } from '../selectors/timeSelectors';

export default function () {
  return (Component) => {
    class Timed extends React.Component {
      static displayName = wrapDisplayName(Component, 'Timed');

      static contextTypes = {
        store: React.PropTypes.object.isRequired,
        timerCallbacks: React.PropTypes.arrayOf(React.PropTypes.func).isRequired
      };

      state = {
        currentTime: this.getCurrentTime()
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
          currentTime: this.getCurrentTime()
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
