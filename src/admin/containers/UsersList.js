import React from 'react';
import useSWR from 'swr';
import UsersList from '../components/UsersList';
import mergeIncludedModels from '../../utils/mergeIncludedModels';

const {
  useMemo,
  useState,
} = React;

const PAGE_SIZE = 50;

function UsersListContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const qs = {
    page: { offset: currentPage * PAGE_SIZE, limit: PAGE_SIZE },
  };
  if (filter) {
    qs.filter = filter;
  }
  const { data } = useSWR(['/users', { qs }], { suspense: true });
  const users = useMemo(() => mergeIncludedModels(data), [data]);
  const totalUsers = data.meta.results;

  return (
    <UsersList
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      totalUsers={totalUsers}
      users={users}
      onPageChange={(_event, page) => setCurrentPage(page)}
      onFilter={setFilter}
    />
  );
}

export default UsersListContainer;
