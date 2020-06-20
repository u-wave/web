import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import debounce from 'just-debounce';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/Search';

const {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} = React;

function PlaylistFilter({ onFilter }) {
  const { t } = useTranslator();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const debouncedOnFilter = useMemo(() => debounce(onFilter, 200), [onFilter]);

  const handleClick = useCallback(() => {
    setOpen(!open);
    setValue('');
  }, [open]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      // If there is still text, clear it. The next time the user presses Escape, close the input.
      if (value !== '') {
        setValue('');
      } else {
        setOpen(false);
      }
    }
  }, [value]);

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  // Focus the input element when it appears.
  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  // Filter the playlist when the value changes.
  useEffect(() => {
    debouncedOnFilter(value);
    return debouncedOnFilter.cancel;
  }, [value]);

  return (
    <div className="PlaylistMediaFilter">
      <Tooltip title={t('playlists.filter')} placement="top">
        <IconButton
          className="PlaylistMeta-iconButton"
          onClick={handleClick}
        >
          <FilterIcon htmlColor={open ? '#fff' : null} />
        </IconButton>
      </Tooltip>
      <input
        type="text"
        ref={inputRef}
        className={cx('PlaylistMediaFilter-input', open && 'is-open')}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </div>
  );
}

PlaylistFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default PlaylistFilter;
