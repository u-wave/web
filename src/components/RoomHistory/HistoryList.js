import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import Base from '../MediaList/BaseMediaList';
import AddToPlaylistAction from '../MediaList/Actions/AddToPlaylist';
import HistoryRow from './Row';

const addMediaActions = onOpenAddMediaMenu => (media, selection) => (
  <React.Fragment>
    <AddToPlaylistAction onAdd={position => onOpenAddMediaMenu(position, media, selection)} />
  </React.Fragment>
);

const noActions = () => [];

const HistoryList = withProps(({ onOpenAddMediaMenu }) => ({
  className: 'RoomHistory-list',
  listComponent: 'div',
  rowComponent: HistoryRow,
  makeActions: onOpenAddMediaMenu
    ? addMediaActions(onOpenAddMediaMenu)
    : noActions,
}))(Base);

HistoryList.propTypes = {
  onOpenAddMediaMenu: PropTypes.func.isRequired,
};

export default HistoryList;
