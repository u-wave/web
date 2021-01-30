import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'just-debounce';

const {
  useCallback,
  useMemo,
} = React;

function Filter({ onFilter }) {
  const onFilterDebounced = useMemo(() => debounce(onFilter, 200), [onFilter]);
  const onChange = useCallback((event) => {
    onFilterDebounced(event.target.value);
  }, [onFilterDebounced]);

  return (
    <input
      type="text"
      className="AdminUserHeader-filter"
      onChange={onChange}
    />
  );
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

function Header({ onFilter }) {
  return (
    <div className="AdminUserHeader">
      <span>Managing Users:</span>
      <span>
        Filter User:
        <Filter onFilter={onFilter} />
      </span>
    </div>
  );
}

Header.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Header;
