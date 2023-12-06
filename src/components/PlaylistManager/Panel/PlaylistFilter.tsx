import cx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { useDebounce } from 'use-debounce';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiMagnify } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

type PlaylistFilterProps = {
  onFilter: (filter: string | null) => void,
};
function PlaylistFilter({ onFilter }: PlaylistFilterProps) {
  const { t } = useTranslator();
  const inputRef = useRef<HTMLInputElement>(null);
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
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleClick = () => {
    const shouldOpen = !isOpen;

    setIsOpen(shouldOpen);
    setValue('');
    if (isOpen && value) {
      onFilter(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      if (value) {
        event.preventDefault();
        setValue('');
      } else {
        setIsOpen(false);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <div className="PlaylistMediaFilter">
      <Tooltip title={t('playlists.filter')} placement="top">
        <IconButton
          className="PlaylistMeta-iconButton"
          onClick={handleClick}
          style={isOpen ? { color: '#fff' } : undefined}
        >
          <SvgIcon path={mdiMagnify} />
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

export default PlaylistFilter;
