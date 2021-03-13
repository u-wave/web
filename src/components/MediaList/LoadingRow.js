import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MediaLoadingIndicator from './MediaLoadingIndicator';

const LoadingRow = ({
  className,
  selected = false,
  ...attrs
}) => (
  <div
    className={cx('MediaListRow', 'is-loading', className, selected && 'is-selected')}
    {...attrs}
  >
    <MediaLoadingIndicator className="MediaListRow-loader" />
    <div className="MediaListRow-data">
      <div className="MediaListRow-artist">
        {' … '}
      </div>
      <div className="MediaListRow-title">
        {' … '}
      </div>
    </div>
    <div className="MediaListRow-duration">
      {' … '}
    </div>
    <div className="MediaListRow-icon" />
  </div>
);

LoadingRow.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.bool,
};

export default LoadingRow;
