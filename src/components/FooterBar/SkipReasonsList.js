import * as React from 'react';
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
  reasons: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    label: React.PropTypes.string
  })).isRequired,
  onSelect: React.PropTypes.func.isRequired
};

export default SkipReasonsList;
