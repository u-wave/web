import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import ActiveOverlayStore from '../../stores/ActiveOverlayStore';
import listen from '../../utils/listen';
import oneOrManyChildren from '../../utils/propTypes/oneOrManyChildren';

function getState() {
  return {
    activeOverlay: ActiveOverlayStore.getActive()
  };
}

@listen(ActiveOverlayStore)
export default class Overlays extends React.Component {
  static propTypes = {
    children: oneOrManyChildren
  };

  state = getState();

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
