import * as React from 'react';
import { ListItem } from 'material-ui/List';
import { fade } from 'material-ui/utils/colorManipulator';
import muiThemeable from 'material-ui/styles/muiThemeable';

const listItemStyle = {
  WebkitAppearance: 'initial'
};
const innerDivStyle = {
  height: 40,
  lineHeight: '24px',
  padding: '8px 16px 8px 48px'
};

const Suggestion = ({
  muiTheme,
  value,
  select,
  selected,
  ...props
}) => (
  <ListItem
    style={selected ? {
      ...listItemStyle,
      background: fade(muiTheme.palette.textColor, 0.1)
    } : listItemStyle}
    innerDivStyle={innerDivStyle}
    value={value}
    primaryText={value}
    onTouchTap={select}
    {...props}
  />
);

Suggestion.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  value: React.PropTypes.string.isRequired,
  select: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired
};

export default muiThemeable()(Suggestion);
