import React from 'react';
import Button from './Button';
import listen from '../../utils/listen';
import { selectPanel } from '../../actions/PanelSelectActionCreators';
import SelectedPanelStore from '../../stores/SelectedPanelStore';

function getState() {
  return {
    selected: SelectedPanelStore.getSelectedPanel()
  };
}

/* TODO think of a reasonable name */
@listen(SelectedPanelStore)
export default class PanelSwitcher extends React.Component {
  state = getState();

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selected !== this.state.selected;
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    return (
      <div className="PanelSwitcher">
        <Button
          text="Chat"
          active={this.state.selected === 'chat'}
          onClick={() => selectPanel('chat')}
        />
        <Button
          text="Room"
          active={this.state.selected === 'room'}
          onClick={() => selectPanel('room')}
        />
        <Button
          text="Waitlist"
          active={this.state.selected === 'waitlist'}
          onClick={() => selectPanel('waitlist')}
        />
      </div>
    );
  }
}
