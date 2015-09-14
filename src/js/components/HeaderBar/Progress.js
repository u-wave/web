import cx from 'classnames';
import React from 'react';

export default class Progress extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    total: React.PropTypes.number,
    elapsed: React.PropTypes.number
  };

  render() {
    const percent = this.props.elapsed / this.props.total;
    const width = isNaN(percent) ? '0%' : `${percent * 100}%`;
    return (
      <div className={cx('Progress', this.props.className)}>
        <div className="Progress-fill" style={{ width: width }} />
      </div>
    );
  }
}
