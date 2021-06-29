import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@material-ui/core/ListItemButton';

const Suggestion = ({
  children,
  className,
  select,
  selected,
  ...props
}) => (
  <ListItemButton
    onClick={select}
    className={cx('SuggestionItem', selected && 'is-focused', className)}
    {...props}
  >
    {children}
  </ListItemButton>
);

Suggestion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Suggestion;
