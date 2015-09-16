import React from 'react';
import Button from './Button';
import { selectPanel } from '../../actions/PanelSelectActionCreators';
import SelectedPanelStore from '../../stores/SelectedPanelStore';

function getState() {
  return {
    selected: SelectedPanelStore.getSelectedPanel()
  };
}

/* TODO think of a reasonable name */
export default class PanelSwitcher extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    SelectedPanelStore.on('change', this.onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selected !== this.state.selected;
  }

  componentWillUnmount() {
    SelectedPanelStore.removeListener('change', this.onChange);
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
