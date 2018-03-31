import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui-next/Paper'; // eslint-disable-line
import List from 'material-ui-next/List'; // eslint-disable-line

const SuggestionsList = ({
  children,
}) => (
  <div className="ChatInput-suggestions">
    <Paper>
      <List>
        {children}
      </List>
    </Paper>
  </div>
);

SuggestionsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuggestionsList;
