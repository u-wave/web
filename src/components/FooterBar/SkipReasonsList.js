import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';

const SkipReasonsList = ({
  reasons,
  onSelect,
}) => (
  <List className="SkipReasonsList">
    {reasons.map(reason => (
      <ListItem
        key={reason.name}
        button
        onClick={() => onSelect(reason.name)}
      >
        <ListItemText className="SkipReasonsList-label" primary={reason.label} />
      </ListItem>
    ))}
  </List>
);

SkipReasonsList.propTypes = {
  reasons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SkipReasonsList;
