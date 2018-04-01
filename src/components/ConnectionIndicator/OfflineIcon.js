import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

const OfflineIcon = ({ style }) => (
  <div
    style={{
      ...style,
      width: 32,
      height: 32,
      display: 'inline-block',
    }}
  >
    <CircularProgress size={32} />
  </div>
);

OfflineIcon.propTypes = {
  style: PropTypes.object,
};

export default OfflineIcon;
