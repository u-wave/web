import * as React from 'react';

const CurrentDJ = ({ className, dj }) => (
  <div className={className}>
    played by: {dj.username}
  </div>
);

CurrentDJ.propTypes = {
  className: React.PropTypes.string,
  dj: React.PropTypes.shape({
    username: React.PropTypes.string.isRequired
  })
};

export default CurrentDJ;
