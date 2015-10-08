import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import ActiveOverlayStore from '../../stores/ActiveOverlayStore';

function getState() {
  return {
    activeOverlay: ActiveOverlayStore.getActive()
  };
}

export default class Overlays extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.arrayOf(React.PropTypes.element)
    ])
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    ActiveOverlayStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    ActiveOverlayStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const { children } = this.props;
    let view;
    if (Array.isArray(children)) {
      view = find(children, child => child.key === this.state.activeOverlay);
    } else if (children.key === this.state.activeOverlay) {
      view = children;
    }
    return (
      <div className="Overlays">
        <TransitionGroup
          transitionName="Overlay"
          transitionEnterTimeout={180}
          transitionLeaveTimeout={180}
        >
          {view}
        </TransitionGroup>
      </div>
    );
  }
}
