import React from 'react';
import PropTypes from 'prop-types';

function Filler({ width }) {
  const style = { width };

  return <span className="Filler" style={style} />;
}
Filler.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Filler;
