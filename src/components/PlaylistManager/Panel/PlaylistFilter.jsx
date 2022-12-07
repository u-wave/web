import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { useDebounce } from 'use-debounce';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FilterIcon from '@mui/icons-material/Search';

const {
  useEffect,
  useRef,
  useState,
} = React;

function PlaylistFilter({ onFilter }) {
  const { t } = useTranslator();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [deferredValue] = useDebounce(value, 200);

  const isFirstRun = useRef(true);
  useEffect(() => {
    // When this component mounts, the data is fresh, so we shouldn't
    // force a refetch.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    onFilter(deferredValue);
  }, [deferredValue, onFilter]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClick = () => {
    const shouldOpen = !isOpen;

    setIsOpen(shouldOpen);
    setValue('');
    if (isOpen && value) {
      onFilter('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (value) {
        event.preventDefault();
        setValue('');
      } else {
        setIsOpen(false);
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="PlaylistMediaFilter">
      <Tooltip title={t('playlists.filter')} placement="top">
        <IconButton
          className="PlaylistMeta-iconButton"
          onClick={handleClick}
        >
          <FilterIcon htmlColor={isOpen ? '#fff' : null} />
        </IconButton>
      </Tooltip>
      <input
        type="text"
        ref={inputRef}
        className={cx('PlaylistMediaFilter-input', isOpen && 'is-open')}
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
