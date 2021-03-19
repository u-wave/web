import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { openPreviewMediaDialog } from '../actions/DialogActionCreators';
import { roomHistoryWithVotesSelector } from '../selectors/roomHistorySelectors';
import Overlay from '../components/Overlay';
import createLazyOverlay from '../components/LazyOverlay';

const mapStateToProps = createStructuredSelector({
  media: roomHistoryWithVotesSelector,
});

const mapDispatchToProps = {
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
