import React from 'react';
import { ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { currentTimeSelector } from '../selectors/timeSelectors';

export default function () {
  return (Component) => {
    class Timed extends React.Component {
      static displayName = wrapDisplayName(Component, 'Timed');

      static contextTypes = {
        timerCallbacks: PropTypes.shape({
          add: PropTypes.func,
          remove: PropTypes.func,
        }).isRequired,
      };

      componentDidMount() {
        const { timerCallbacks } = this.context;

        timerCallbacks.add(this.tick);
      }

      componentWillUnmount() {
        const { timerCallbacks } = this.context;

        timerCallbacks.remove(this.tick);
      }

      tick = () => {
        this.setState({});
      };

      render() {
        return (
          <ReactReduxContext.Consumer>
            {({ store }) => (
              <Component
                {...this.props}
                currentTime={currentTimeSelector(store.getState())}
              />
            )}
          </ReactReduxContext.Consumer>
        );
      }
    }
    return Timed;
  };
}
