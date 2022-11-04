import React from 'react';
import useSWR from 'swr';
import { useAsyncCallback } from 'react-async-hook';
import { useDispatch } from 'react-redux';
import { unbanUser } from '../actions/bans';
import BansList from '../components/BansList';

const {
  useState,
} = React;

const PAGE_SIZE = 25;

function BansListContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const params = new URLSearchParams([
    ['page[offset]', currentPage * PAGE_SIZE],
    ['page[limit]', PAGE_SIZE],
    ['filter', filter],
  ]);
  const { data, mutate } = useSWR(`/bans?${params}`, { suspense: true });
  const {
    data: bans,
    meta: { results: count },
  } = data;

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
