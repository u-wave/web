import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UsersList from '../components/UsersList';
import { loadUsers, setUsersFilter } from '../actions/users';
import {
  pageSelector,
  pageSizeSelector,
  totalUsersSelector,
  usersSelector,
} from '../selectors/userSelectors';

const {
  useCallback,
  useEffect,
} = React;

function UsersListContainer() {
  const currentPage = useSelector(pageSelector);
  const pageSize = useSelector(pageSizeSelector);
  const totalUsers = useSelector(totalUsersSelector);
  const users = useSelector(usersSelector);
  const dispatch = useDispatch();

  const onPageChange = useCallback((event, page) => {
    dispatch(loadUsers({ offset: page * pageSize, limit: pageSize }));
  }, [dispatch, pageSize]);

  const onFilter = useCallback((filter) => {
    dispatch(setUsersFilter(filter));
    dispatch(loadUsers({ offset: 0, limit: pageSize }));
  }, [dispatch, pageSize]);

  useEffect(() => {
    onPageChange(null, 0);
    // Should happen on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersList
      currentPage={currentPage}
      pageSize={pageSize}
      totalUsers={totalUsers}
      users={users}
      onPageChange={onPageChange}
      onFilter={onFilter}
    />
  );
}

export default UsersListContainer;
