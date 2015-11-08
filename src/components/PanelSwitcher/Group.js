import cx from 'classnames';
import find from 'array-find';
import React from 'react';
import listen from '../../utils/listen';
import SelectedPanelStore from '../../stores/SelectedPanelStore';

function getState() {
  return {
    selected: SelectedPanelStore.getSelectedPanel()
  };
}

@listen(SelectedPanelStore)
export default class Group extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.array
  };

  state = getState();

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selected !== this.state.selected;
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const { selected } = this.state;
    const view = find(this.props.children, child => child.props.name === selected);
    return (
      <div className={cx('PanelGroup', this.props.className)}>
        {view}
      </div>
    );
  }
}
