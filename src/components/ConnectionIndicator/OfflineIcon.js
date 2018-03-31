import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const OfflineIcon = ({ style }) => (
  <div
    style={{
      ...style,
      width: 32,
      height: 32,
      display: 'inline-block',
    }}
  >
    <Loader size="tiny" />
  </div>
);

OfflineIcon.propTypes = {
  style: PropTypes.object,
};

export default OfflineIcon;
