import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MuiListItem from '@material-ui/core/ListItem';
import LtrSelectedIcon from '@material-ui/icons/ChevronRight';
import RtlSelectedIcon from '@material-ui/icons/ChevronLeft';

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
    {selected && (
      <>
        <LtrSelectedIcon className="u-rtl-hidden" />
        <RtlSelectedIcon className="u-rtl-only" />
      </>
    )}
  </MuiListItem>
);

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
};

export default ListItem;
