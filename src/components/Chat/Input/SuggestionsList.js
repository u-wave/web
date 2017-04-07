import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';

const SuggestionsList = ({
  children
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
  children: PropTypes.node.isRequired
};

export default SuggestionsList;
