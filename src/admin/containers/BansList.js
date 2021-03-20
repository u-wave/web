import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBans, unbanUserAndReload } from '../actions/bans';
import BansList from '../components/BansList';

const {
  useCallback,
  useEffect,
} = React;

function BansListContainer() {
  const bans = useSelector((state) => state.admin.bans.bans);
  const dispatch = useDispatch();

  const onUnbanUser = useCallback((user) => {
    dispatch(unbanUserAndReload(user));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadBans());
  }, [dispatch]);

  return (
    <BansList
      bans={bans}
      onUnbanUser={onUnbanUser}
    />
  );
}

export default BansListContainer;
