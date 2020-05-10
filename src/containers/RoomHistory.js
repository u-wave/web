import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { openPreviewMediaDialog } from '../actions/DialogActionCreators';
import { addMediaMenu } from '../actions/PlaylistActionCreators';
import { roomHistoryWithVotesSelector } from '../selectors/roomHistorySelectors';
import Overlay from '../components/Overlay';
import createLazyOverlay from '../components/LazyOverlay';

const {
  useCallback,
} = React;

const selectionOrOne = (media, selection) => {
  // History entries store the played media on their `.media` property
  if (selection.isSelected(media)) {
    return selection.get().map((item) => item.media);
  }
  return [media.media];
};

function RoomHistoryOverlay(props) {
  return <Overlay {...props} direction="top" />;
}

const RoomHistory = createLazyOverlay({
  loader: () => import('../components/RoomHistory' /* webpackChunkName: "history" */),
  title: (t) => t('history.title'),
  OverlayComponent: RoomHistoryOverlay,
});

function RoomHistoryContainer({ onCloseOverlay }) {
  const history = useSelector(roomHistoryWithVotesSelector);
  const dispatch = useDispatch();
  const onOpenAddMediaMenu = useCallback((position, media, selection) => (
    dispatch(addMediaMenu(selectionOrOne(media, selection), position))
  ), []);
  const onOpenPreviewMediaDialog = useCallback(
    (media) => dispatch(openPreviewMediaDialog(media)),
    [],
  );

  return (
    <RoomHistory
      media={history}
      onOpenAddMediaMenu={onOpenAddMediaMenu}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
      onCloseOverlay={onCloseOverlay}
    />
  );
}

RoomHistoryContainer.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default RoomHistoryContainer;
