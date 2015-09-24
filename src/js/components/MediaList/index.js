import cx from 'classnames';
import React from 'react';
import Row from './Row';

export default class Menu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.array
  };

  render() {
    const { className, media } = this.props;
    return (
      <div className={cx('MediaList', className)}>
        {media.map((item, i) => {
          return <Row key={i} className="MediaList-row" media={item} />;
        })}
      </div>
    );
  }
}
