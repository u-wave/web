import cx from 'classnames';
import React from 'react';
import Row from './Row';

export default class MediaList extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.array
  };

  state = { selection: [] };

  componentWillReceiveProps(nextProps) {
    if (nextProps.media !== this.props.media) {
      this.setState({ selection: [] });
    }
  }

  selectItem(index, e) {
    e.preventDefault();

    let { selection } = this.state;

    // TODO shift+click for selecting ranges
    if (e.ctrlKey) {
      const where = selection.indexOf(index);
      if (where === -1) {
        selection.push(index);
      } else {
        selection.splice(where, 1);
      }
    } else {
      selection = [ index ];
    }

    this.setState({ selection: selection.slice() });
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
            selected={selection.indexOf(i) !== -1}
            onMouseDown={this.selectItem.bind(this, i)}
          />
        ))}
      </div>
    );
  }
}
