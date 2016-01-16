import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import curry from 'curry';

import { addMediaMenu } from '../actions/PlaylistActionCreators';

import { roomHistorySelector } from '../selectors/roomHistorySelectors';
import RoomHistory from '../components/RoomHistory';

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [ media ];
};

const mapStateToProps = createStructuredSelector({
  media: roomHistorySelector
});

const mapDispatchToProps = dispatch => {
  const onOpenAddMediaMenu = bindActionCreators(
    (position, media, selection) =>
      addMediaMenu(selectionOrOne(media, selection), position),
    dispatch
  );
  return {
    onOpenAddMediaMenu: curry.to(3, onOpenAddMediaMenu)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class RoomHistoryContainer extends Component {
  render() {
    return <RoomHistory {...this.props} />;
  }
}
