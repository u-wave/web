import cx from 'classnames';
import React from 'react';
import List from 'react-list';
import itemSelection from 'item-selection/immutable';
import Row from './Row';

export default class MediaList extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.array
  };

  state = { selection: itemSelection(this.props.media) };

  componentWillReceiveProps(nextProps) {
    if (nextProps.media !== this.props.media) {
      this.setState({
        selection: itemSelection(nextProps.media)
      });
    }
  }

  selectItem(index, e) {
    e.preventDefault();

    let { selection } = this.state;

    if (e.shiftKey) {
      selection = selection.selectRange(index);
    } else if (e.ctrlKey) {
      selection = selection.selectToggle(index);
    } else {
      selection = selection.select(index);
    }

    this.setState({ selection: selection });
  }

  renderRow(index, key) {
    const media = this.props.media[index];
    const { selection } = this.state;
    const selected = selection.isSelectedIndex(index);
    return (
      <Row
        key={key}
        className="MediaList-row"
        media={media}
        selected={selected}
        selection={selection.get()}
        onClick={e => this.selectItem(index, e)}
      />
    );
  }

  render() {
    const { className, media } = this.props;
    return (
      <div className={cx('MediaList', className)}>
        <List
          itemRenderer={::this.renderRow}
          length={media.length}
          type="uniform"
        />
      </div>
    );
  }
}
