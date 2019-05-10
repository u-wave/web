import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import SearchIcon from '@material-ui/icons/Search';

const {
  useCallback,
  useEffect,
  useState,
} = React;

function SearchBar({
  children, className, autoFocus, onSubmit,
}) {
  const { t } = useTranslator();
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(() => setFocused(true), [setFocused]);
  const handleBlur = useCallback(() => setFocused(false), [setFocused]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      onSubmit(event.target.value);
    }
  }, [onSubmit]);

  useEffect(() => {
    if (autoFocus) {
      this.input.focus();
    }
    return () => null;
  }, []);

  return (
    <div className={cx('SearchBar', focused ? 'is-focused' : '', className)}>
      <div className="SearchBar-icon">
        <SearchIcon />
      </div>
      {children}
      <div className="SearchBar-query">
        <input
          className="SearchBar-input"
          type="text"
          placeholder={focused ? '' : t('playlists.search.action')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  autoFocus: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
