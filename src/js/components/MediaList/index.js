import cx from 'classnames';
import React from 'react';
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

  render() {
    const { className, media } = this.props;
    const { selection } = this.state;
    return (
      <div className={cx('MediaList', className)}>
        {media.map((item, i) => (
          <Row
            key={i}
            className="MediaList-row"
            media={item}
            selected={selection.isSelectedIndex(i)}
            onMouseDown={this.selectItem.bind(this, i)}
          />
        ))}
      </div>
    );
  }
}
