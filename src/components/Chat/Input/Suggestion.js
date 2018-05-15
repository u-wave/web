import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';

const Suggestion = ({
  children,
  className,
  select,
  selected,
  ...props
}) => (
  <ListItem
    button
    onClick={select}
    className={cx('SuggestionItem', selected && 'is-focused', className)}
    {...props}
  >
    {children}
  </ListItem>
);

Suggestion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Suggestion;
