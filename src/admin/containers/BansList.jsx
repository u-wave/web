import React from 'react';
import useSWR from 'swr';
import { useAsyncCallback } from 'react-async-hook';
import { useDispatch } from '../../hooks/useRedux';
import { unbanUser } from '../actions/bans';
import BansList from '../components/BansList';
import mergeIncludedModels from '../../utils/mergeIncludedModels';

const {
  useMemo,
  useState,
} = React;

const PAGE_SIZE = 25;

function BansListContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const qs = {
    page: { offset: currentPage * PAGE_SIZE, limit: PAGE_SIZE },
  };
  if (filter) {
    qs.filter = filter;
  }
  const { data, mutate } = useSWR(['/bans', { qs }], { suspense: true, revalidateOnFocus: false });
  const bans = useMemo(() => mergeIncludedModels(data), [data]);
  const count = data.meta.results;

  const dispatch = useDispatch();
  const onUnbanUser = useAsyncCallback(async (user) => {
    await dispatch(unbanUser(user));
    mutate();
  }, [dispatch, mutate]);

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
