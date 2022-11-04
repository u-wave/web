import React from 'react';
import useSWR from 'swr';
import UsersList from '../components/UsersList';

const {
  useState,
} = React;

const PAGE_SIZE = 25;

function UsersListContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const params = new URLSearchParams([
    ['page[offset]', currentPage * PAGE_SIZE],
    ['page[limit]', PAGE_SIZE],
    ['filter', filter],
  ]);
  const { data } = useSWR(`/users?${params}`, { suspense: true });
  const {
    data: users,
    meta: { results: totalUsers },
  } = data;

  return (
    <UsersList
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      totalUsers={totalUsers}
      users={users}
      onPageChange={setCurrentPage}
      onFilter={setFilter}
    />
  );
}

export default UsersListContainer;
