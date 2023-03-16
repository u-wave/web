import cx from 'clsx';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { mdiMagnify } from '@mdi/js';
import SvgIcon from '../SvgIcon';

type SearchBarProps = {
  children: React.ReactNode,
  className?: string,
  autoFocus?: boolean,
  onSubmit: (value: string) => void,
};

function SearchBar({
  children, className, autoFocus, onSubmit,
}: SearchBarProps) {
  const { t } = useTranslator();
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(() => setFocused(true), [setFocused]);
  const handleBlur = useCallback(() => setFocused(false), [setFocused]);
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit(event.currentTarget.value);
    }
  }, [onSubmit]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
    // `autoFocus` is only checked on mount on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('SearchBar', focused ? 'is-focused' : '', className)}>
      <div className="SearchBar-icon">
        <SvgIcon path={mdiMagnify} />
      </div>
      {children}
      <div className="SearchBar-query">
        <input
          ref={inputRef}
          className="SearchBar-input"
          type="text"
          aria-label={t('playlists.search.action')}
          placeholder={focused ? '' : t('playlists.search.placeholder')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default SearchBar;
