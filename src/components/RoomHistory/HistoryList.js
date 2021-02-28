import React from 'react';
import PropTypes from 'prop-types';
import Base from '../MediaList/BaseMediaList';
import AddToPlaylistAction from '../MediaList/Actions/AddToPlaylist';
import HistoryRow from './Row';

const { useMemo } = React;

function HistoryList({
  onOpenAddMediaMenu,
  isLoggedIn = false,
  ...props
}) {
  const makeActions = useMemo(() => {
    if (onOpenAddMediaMenu && isLoggedIn) {
      return (media, selection) => (
        <AddToPlaylistAction
          onAdd={(position) => onOpenAddMediaMenu(position, media, selection)}
        />
      );
    }
    return () => [];
  }, [onOpenAddMediaMenu, isLoggedIn]);

  return (
    <Base
      className="RoomHistory-list"
      listComponent="div"
      rowComponent={HistoryRow}
      makeActions={makeActions}
      {...props}
    />
  );
}

HistoryList.propTypes = {
  onOpenAddMediaMenu: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

export default HistoryList;
