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
  <Menu onItemTouchTap={(event, item) => onSelect(item.props.primaryText)}>
    {reasons.map((reason, i) => (
      <MenuItem
        key={i}
        value={i}
        style={menuItemStyle}
        primaryText={reason}
      />
    ))}
    <MenuItem
      value={-1}
      style={menuItemStyle}
      primaryText="Other"
    />
  </Menu>
);

SkipReasonsList.propTypes = {
  reasons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onSelect: React.PropTypes.func.isRequired
};

export default SkipReasonsList;
