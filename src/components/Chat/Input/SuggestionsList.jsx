import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

const SuggestionsList = ({
  children,
}) => (
  <div className="ChatInput-suggestions">
    <Paper>
      {children}
    </Paper>
  </div>
);

SuggestionsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuggestionsList;
