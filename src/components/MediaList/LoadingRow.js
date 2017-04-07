import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import MediaLoadingIndicator from './MediaLoadingIndicator';

export default class LoadingRow extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  render() {
    const { className, selected, ...attrs } = this.props;
    const selectedClass = selected ? 'is-selected' : '';
    return (
      <div
        className={cx('MediaListRow', 'is-loading', className, selectedClass)}
        {...attrs}
      >
        <MediaLoadingIndicator className="MediaListRow-loader" />
        <div className="MediaListRow-artist"> … </div>
        <div className="MediaListRow-title"> … </div>
        <div className="MediaListRow-duration"> … </div>
      </div>
    );
  }
}
