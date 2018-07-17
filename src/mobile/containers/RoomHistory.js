import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withProps from 'recompose/withProps';
import { openPreviewMediaDialog } from '../../actions/DialogActionCreators';
import { addMediaMenu } from '../../actions/PlaylistActionCreators';
import { roomHistoryWithVotesSelector } from '../../selectors/roomHistorySelectors';
import Overlay from '../../components/Overlay';
import createLazyOverlay from '../../components/LazyOverlay';

const selectionOrOne = (media, selection) => {
  // History entries store the played media on their `.media` property
  if (selection.isSelected(media)) {
    return selection.get().map(item => item.media);
  }
  return [media.media];
};

const mapStateToProps = createStructuredSelector({
  media: roomHistoryWithVotesSelector,
});

const onOpenAddMediaMenu = (position, media, selection) => (
  addMediaMenu(selectionOrOne(media, selection), position)
);
const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog: openPreviewMediaDialog,
}, dispatch);

const enhance = connect(mapStateToProps, mapDispatchToProps);

const RoomHistory = createLazyOverlay({
  loader: () => import('../components/RoomHistory' /* webpackChunkName: "historyMobile" */),
  title: t => t('history.title'),
  OverlayComponent: withProps({
    direction: 'top',
  })(Overlay),
});

export default enhance(RoomHistory);
