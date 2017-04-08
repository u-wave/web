import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import transformStyle from '../../utils/transformStyle';
import timed from '../../utils/timed';

const Progress = ({ className, media, currentTime, startTime }) => {
  let width = 0;
  if (media) {
    const duration = media ? media.end - media.start : 0;
    const elapsed = startTime ? Math.max((currentTime - startTime) / 1000, 0) : 0;
    width = duration
      // Ensure that the result is between 0 and 1
      ? Math.max(0, Math.min(1, elapsed / duration))
      : 0;
  }
  if (!isFinite(width)) {
    width = 0;
  }

  return (
    <div className={cx('Progress', className)}>
      <div
        className="Progress-fill"
        style={transformStyle(`scaleX(${width})`)}
      />
    </div>
  );
};

Progress.propTypes = {
  className: PropTypes.string,
  media: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  startTime: PropTypes.number
};

export default timed()(Progress);
