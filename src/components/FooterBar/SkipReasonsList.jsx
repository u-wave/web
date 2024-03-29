import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const SkipReasonsList = ({
  reasons,
  onSelect,
}) => (
  <List className="SkipReasonsList">
    {reasons.map((reason) => (
      <ListItemButton
        key={reason.name}
        onClick={() => onSelect(reason.name)}
      >
        <ListItemText className="SkipReasonsList-label" primary={reason.label} />
      </ListItemButton>
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
