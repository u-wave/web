import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import curry from 'curry';

import { addMediaMenu } from '../actions/PlaylistActionCreators';

import { roomHistoryWithVotesSelector } from '../selectors/roomHistorySelectors';
import RoomHistory from '../components/RoomHistory';

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [ media ];
};

const mapStateToProps = createStructuredSelector({
  media: roomHistoryWithVotesSelector
});

const onOpenAddMediaMenu = (position, media, selection) =>
  addMediaMenu(selectionOrOne(media, selection), position);
const mapDispatchToProps = dispatch => {
  const onOpenAddMediaMenuBound = bindActionCreators(
    onOpenAddMediaMenu,
    dispatch
  );
  return {
    onOpenAddMediaMenu: curry.to(3, onOpenAddMediaMenuBound)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class RoomHistoryContainer extends Component {
  render() {
    return <RoomHistory {...this.props} />;
  }
}
