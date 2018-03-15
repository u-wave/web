import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const MediaLoadingIndicator = ({ className }) => (
  <div className={cx('MediaLoadingIndicator', className)}>
    <Loader size="tiny" className="MediaLoadingIndicator-spinner" />
  </div>
);

MediaLoadingIndicator.propTypes = {
  className: PropTypes.string,
};

export default MediaLoadingIndicator;
