import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import LtrSelectedIcon from '@mui/icons-material/ChevronRight';
import RtlSelectedIcon from '@mui/icons-material/ChevronLeft';

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
  <ListItemButton
    {...props}
    className={cx(className, selected && 'is-selected')}
  >
    {children}
    {selected && (
      <>
        <LtrSelectedIcon className="u-rtl-hidden" />
        <RtlSelectedIcon className="u-rtl-only" />
      </>
    )}
  </ListItemButton>
);

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
};

export default ListItem;
