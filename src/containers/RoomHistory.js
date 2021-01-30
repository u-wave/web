import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { openPreviewMediaDialog } from '../actions/DialogActionCreators';
import { addMediaMenu } from '../actions/PlaylistActionCreators';
import { roomHistoryWithVotesSelector } from '../selectors/roomHistorySelectors';
import { isLoggedInSelector } from '../selectors/userSelectors';
import Overlay from '../components/Overlay';
import createLazyOverlay from '../components/LazyOverlay';

const selectionOrOne = (media, selection) => {
  // History entries store the played media on their `.media` property
  if (selection.isSelected(media)) {
    return selection.get().map((item) => item.media);
  }
  return [media.media];
};

const mapStateToProps = createStructuredSelector({
  media: roomHistoryWithVotesSelector,
  isLoggedIn: isLoggedInSelector,
});

const onOpenAddMediaMenu = (position, media, selection) => (
  addMediaMenu(selectionOrOne(media, selection), position)
);
const mapDispatchToProps = {
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog: openPreviewMediaDialog,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

function RoomHistoryOverlay(props) {
  return <Overlay {...props} direction="top" />;
}

const RoomHistory = createLazyOverlay({
  loader: () => import('../components/RoomHistory'),
  title: (t) => t('history.title'),
  OverlayComponent: RoomHistoryOverlay,
});

export default enhance(RoomHistory);
