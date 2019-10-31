import React from 'react';
import PropTypes from 'prop-types';
import Base from '../MediaList/BaseMediaList';
import AddToPlaylistAction from '../MediaList/Actions/AddToPlaylist';
import HistoryRow from './Row';

const { useMemo } = React;

function HistoryList({ onOpenAddMediaMenu, ...props }) {
  const makeActions = useMemo(() => {
    if (onOpenAddMediaMenu) {
      return (media, selection) => (
        <AddToPlaylistAction
          onAdd={(position) => onOpenAddMediaMenu(position, media, selection)}
        />
      );
    }
    return () => [];
  }, [onOpenAddMediaMenu]);

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
};

export default HistoryList;
