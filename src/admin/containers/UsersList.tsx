import { useMemo, useState } from 'react';
import useSWR from 'swr';
import UsersList from '../components/UsersList';
import mergeIncludedModels from '../../utils/mergeIncludedModels';

const PAGE_SIZE = 50;

function UsersListContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const qs = {
    page: { offset: currentPage * PAGE_SIZE, limit: PAGE_SIZE },
    filter: filter || undefined,
  };
  const { data } = useSWR(['/users', { qs }], { suspense: true, revalidateOnFocus: false });
  const users = useMemo(() => mergeIncludedModels(data), [data]);
  const totalUsers = data.meta.results;

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
