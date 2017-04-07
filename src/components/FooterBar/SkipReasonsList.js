import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const menuItemStyle = {
  WebkitAppearance: 'initial'
};

const SkipReasonsList = ({
  reasons,
  onSelect
}) => (
  <Menu onItemTouchTap={(event, item) => onSelect(item.props.value)}>
    {reasons.map(reason => (
      <MenuItem
        key={reason.name}
        value={reason.name}
        style={menuItemStyle}
        primaryText={reason.label}
      />
    ))}
  </Menu>
);

SkipReasonsList.propTypes = {
  reasons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SkipReasonsList;
