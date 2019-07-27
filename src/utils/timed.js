import React from 'react';
import { ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';
import ClockContext from '../context/ClockContext';
import { currentTimeSelector } from '../selectors/timeSelectors';

export default function () {
  return (Component) => {
    class Timed extends React.Component {
      static displayName = `Timed(${Component.displayName || Component.name || 'anonymous'})`;

      static propTypes = {
        timerCallbacks: PropTypes.shape({
          add: PropTypes.func,
          remove: PropTypes.func,
        }).isRequired,
      };

      componentDidMount() {
        const { timerCallbacks } = this.props;

        timerCallbacks.add(this.tick);
      }

      componentWillUnmount() {
        const { timerCallbacks } = this.props;

        timerCallbacks.remove(this.tick);
      }

      tick = () => {
        this.setState({});
      };

      render() {
        const { timerCallbacks, ...props } = this.props;

        return (
          <ReactReduxContext.Consumer>
            {({ store }) => (
              <Component
                {...props}
                currentTime={currentTimeSelector(store.getState())}
              />
            )}
          </ReactReduxContext.Consumer>
        );
      }
    }

    return props => (
      <ClockContext.Consumer>
        {timerCallbacks => (
          <Timed
            {...props}
            timerCallbacks={timerCallbacks}
          />
        )}
      </ClockContext.Consumer>
    );
  };
}
