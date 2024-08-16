import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useAsyncCallback } from 'react-async-hook';
import BansList from '../components/BansList';
import mergeIncludedModels from '../../utils/mergeIncludedModels';
import uwFetch from '../../utils/fetch';
import type { User } from '../../reducers/users';

const PAGE_SIZE = 25;

function BansListContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const qs = {
    page: { offset: currentPage * PAGE_SIZE, limit: PAGE_SIZE },
    filter: filter || undefined,
  };
  const { data, mutate } = useSWR(['/bans', { qs }], { suspense: true, revalidateOnFocus: false });
  const bans = useMemo(() => mergeIncludedModels(data), [data]);
  const count = data.meta.results;

  const onUnbanUser = useAsyncCallback(async (user: User) => {
    await uwFetch([`/bans/${user._id}`, { method: 'delete' }]);
    await mutate();
  });

  return (
    <BansList
      bans={bans}
      count={count}
      pageSize={PAGE_SIZE}
      currentPage={currentPage}
      onUnbanUser={onUnbanUser.execute}
      onPageChange={setCurrentPage}
      onFilter={setFilter}
    />
  );
}

export default BansListContainer;
