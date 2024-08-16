import { useCallback, useMemo } from 'react';
import debounce from 'just-debounce';

type FilterProps = {
  onFilter: (value: string) => void,
};
function Filter({ onFilter }: FilterProps) {
  const onFilterDebounced = useMemo(() => debounce(onFilter, 200), [onFilter]);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

type HeaderProps = {
  onFilter: (value: string) => void,
};
function Header({ onFilter }: HeaderProps) {
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

export default Header;
