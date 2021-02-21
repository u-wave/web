import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import SearchIcon from '@material-ui/icons/Search';

const {
  useCallback,
  useEffect,
  useRef,
  useState,
} = React;

function SearchBar({
  children, className, autoFocus, onSubmit,
}) {
  const { t } = useTranslator();
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(() => setFocused(true), [setFocused]);
  const handleBlur = useCallback(() => setFocused(false), [setFocused]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      onSubmit(event.target.value);
    }
  }, [onSubmit]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
    return () => null;
    // `autoFocus` is only checked on mount on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('SearchBar', focused ? 'is-focused' : '', className)}>
      <div className="SearchBar-icon">
        <SearchIcon />
      </div>
      {children}
      <div className="SearchBar-query">
        <input
          ref={inputRef}
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
