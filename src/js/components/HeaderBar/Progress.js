import cx from 'classnames';
import React from 'react';

export default class Progress extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    total: React.PropTypes.number,
    startTime: React.PropTypes.number
  };

  render() {
    const elapsed = Math.round((Date.now() - this.props.startTime) / 1000);
    const percent = elapsed / this.props.total;
    const width = isNaN(percent) ? '0%' : `${percent * 100}%`;
    return (
      <div className={cx('Progress', this.props.className)}>
        <div className="Progress-fill" style={{ width: width }} />
      </div>
    );
  }
}
