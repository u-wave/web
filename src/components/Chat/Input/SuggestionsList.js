import * as React from 'react';
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
  children: React.PropTypes.node.isRequired
};

export default SuggestionsList;
