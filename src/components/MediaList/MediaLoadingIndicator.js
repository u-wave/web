import React from 'react';
import cx from 'classnames';
import Loader from '../Loader';

const MediaLoadingIndicator = ({ className }) => (
  <div className={cx('MediaLoadingIndicator', className)}>
    <Loader size="tiny" className="MediaLoadingIndicator-spinner" />
  </div>
);

export default MediaLoadingIndicator;
