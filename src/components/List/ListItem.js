import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ListItem as MuiListItem } from 'material-ui/List';
import SelectedIcon from '@material-ui/icons/ChevronRight';

/**
 * A ListItem component wrapper around material-ui's ListItem,
 * with a üWave skin.
 */

const ListItem = ({
  className,
  children,
  selected,
  ...props
}) => (
  <MuiListItem
    button
    {...props}
    className={cx(className, selected && 'is-selected')}
  >
    {children}
    {selected && <SelectedIcon />}
  </MuiListItem>
);

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
};

export default ListItem;
