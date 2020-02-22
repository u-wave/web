import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from '@u-wave/react-mq';

function Mobile({ children }) {
  return <MediaQuery query="(max-width: 767px)">{children}</MediaQuery>;
}

Mobile.propTypes = {
  children: PropTypes.element.isRequired,
};

function Desktop({ children }) {
  return <MediaQuery query="(min-width: 768px)">{children}</MediaQuery>;
}

Desktop.propTypes = {
  children: PropTypes.element.isRequired,
};

export { Mobile, Desktop };
