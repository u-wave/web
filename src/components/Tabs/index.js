import * as React from 'react';
import { Tabs as MuiTabs } from 'material-ui/Tabs';
import TabTemplate from './TabTemplate';

const baseTabItemContainerStyle = {
  height: 56,
  backgroundColor: '#151515'
};

const tabStyle = {
  float: 'left',
  color: '#fff',
  fontSize: '10pt',
  height: '100%',
  backgroundColor: '#151515'
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: 'rgba(48, 48, 48, 0.3)'
};

const baseInkBarStyle = {
  height: 3,
  marginTop: -3,
  backgroundColor: '#fff'
};

const baseContentStyle = {
  // This ensures that the `position:absolute`s on divs _inside_ container
  // elements align correctly.
  position: 'static'
};

// This component just wraps the Material-UI tabs with some default styling.
// Our styling isn't quite material design, so we can't just use themes for
// this stuff.
const StyledTabs = ({
  tabItemContainerStyle,
  inkBarStyle,
  contentContainerStyle,
  children,
  value,
  ...props
}) => (
  <MuiTabs
    tabItemContainerStyle={{
      ...baseTabItemContainerStyle,
      ...tabItemContainerStyle
    }}
    inkBarStyle={{
      ...baseInkBarStyle,
      ...inkBarStyle
    }}
    contentContainerStyle={{
      ...baseContentStyle,
      ...contentContainerStyle
    }}
    tabTemplate={TabTemplate}
    value={value}
    {...props}
  >
    {React.Children.map(children, tab => (
      React.cloneElement(tab, {
        style: {
          ...(value === tab.props.value ? activeTabStyle : tabStyle),
          ...tab.props.style
        }
      })
    ))}
  </MuiTabs>
);

StyledTabs.propTypes = {
  tabItemContainerStyle: React.PropTypes.object,
  inkBarStyle: React.PropTypes.object,
  contentContainerStyle: React.PropTypes.object,
  children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
  value: React.PropTypes.string
};

export default StyledTabs;
