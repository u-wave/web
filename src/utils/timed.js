import * as React from 'react';
import { currentTimeSelector } from '../selectors/timeSelectors';

export default function () {
  return (Component) => {
    class Timed extends React.Component {
      static contextTypes = {
        store: React.PropTypes.object.isRequired,
        timerCallbacks: React.PropTypes.arrayOf(React.PropTypes.func).isRequired
      };

      state = {};

      componentWillMount() {
        this.context.timerCallbacks.push(this.tick);
        this.tick();
      }

      componentWillUnmount() {
        const { timerCallbacks } = this.context;
        const index = timerCallbacks.indexOf(this.tick);
        if (index !== -1) {
          timerCallbacks.splice(index, 1);
        }
      }

      tick = () => {
        this.setState({
          currentTime: currentTimeSelector(this.context.store.getState())
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
