import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import Base from '../MediaList/BaseMediaList';
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

const HistoryList = withProps(props => ({
  className: 'RoomHistory-list',
  listComponent: 'div',
  rowComponent: HistoryRow,
  makeActions: props.onOpenAddMediaMenu
    ? addMediaActions(props.onOpenAddMediaMenu)
    : noActions,
}))(Base);

HistoryList.propTypes = {
  onOpenAddMediaMenu: PropTypes.func.isRequired,
};

export default HistoryList;
