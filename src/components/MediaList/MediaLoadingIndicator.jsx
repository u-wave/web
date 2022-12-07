import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

const MediaLoadingIndicator = ({ className }) => (
  <div className={cx('MediaLoadingIndicator', className)}>
    <CircularProgress className="MediaLoadingIndicator-spinner" />
  </div>
);

MediaLoadingIndicator.propTypes = {
  className: PropTypes.string,
};

export default MediaLoadingIndicator;
