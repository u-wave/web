import cx from 'classnames';
import * as React from 'react';
import Loader from '../Loader';

const MediaLoadingIndicator = ({ className }) => (
  <div className={cx('MediaLoadingIndicator', className)}>
    <Loader size="tiny" className="MediaLoadingIndicator-spinner" />
  </div>
);

MediaLoadingIndicator.propTypes = {
  className: React.PropTypes.string
};

export default MediaLoadingIndicator;
