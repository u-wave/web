import cx from 'classnames';
import find from 'array-find';
import React from 'react';
import SelectedPanelStore from '../../stores/SelectedPanelStore';

function getState() {
  return {
    selected: SelectedPanelStore.getSelectedPanel()
  };
}

export default class Group extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.array
  };

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
    SelectedPanelStore.off('change', this.onChange);
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
