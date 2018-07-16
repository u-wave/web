import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';

const enhance = compose(
  withProps(({ onFilter }) => ({
    onFilterDebounced: debounce(onFilter, 200),
  })),
  withHandlers({
    onChange: ({ onFilterDebounced }) => (
      event => onFilterDebounced(event.target.value)
    ),
  }),
);

const Filter = ({ onChange }) => (
  <input
    type="text"
    className="AdminUserHeader-filter"
    onChange={onChange}
  />
);
Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const ConnectedFilter = enhance(Filter);

const Header = ({ onFilter }) => (
  <div className="AdminUserHeader">
    <span>Managing Users:</span>
    <span>
      Filter User:
      <ConnectedFilter onFilter={onFilter} />
    </span>
  </div>
);
Header.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Header;
