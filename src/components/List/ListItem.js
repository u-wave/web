import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import mapProps from 'recompose/mapProps';
import { ListItem as MuiListItem } from 'material-ui/List';
import SelectedIcon from 'material-ui/svg-icons/navigation/chevron-right';

/**
 * A ListItem component wrapper around material-ui's ListItem,
 * with a üWave skin.
 */

const selectedStyle = {
  backgroundColor: '#9d2053',
};

const enhance = mapProps(({
  selected, className, style, ...props
}) => ({
  hoverColor: '#242424',
  rightIcon: selected ? <SelectedIcon color="#fff" /> : null,
  ...props,
  className: cx(className, selected && 'is-selected'),
  style: selected
    ? { ...selectedStyle, ...style }
    : style,
}));

const ListItem = enhance(MuiListItem);

ListItem.propTypes = {
  selected: PropTypes.bool,
};

export default ListItem;
