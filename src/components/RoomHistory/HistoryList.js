import React from 'react';
import PropTypes from 'prop-types';
import MediaList from '../MediaList';
import AddToPlaylistAction from '../MediaList/Actions/AddToPlaylist';
import HistoryRow from './Row';

const addMediaActions = onOpenAddMediaMenu =>
  (media, selection) => [
    <AddToPlaylistAction
      key="add"
      onAdd={position => onOpenAddMediaMenu(position, media, selection)}
    />,
  ];

const noActions = () => [];

const HistoryList = ({ onOpenAddMediaMenu, ...props }) => (
  <MediaList
    {...props}
    className="RoomHistory-list"
    rowComponent={HistoryRow}
    makeActions={onOpenAddMediaMenu ? addMediaActions(onOpenAddMediaMenu) : noActions}
  />
);

HistoryList.propTypes = {
  onOpenAddMediaMenu: PropTypes.func.isRequired,
};

export default HistoryList;
