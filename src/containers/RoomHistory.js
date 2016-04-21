import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addMediaMenu } from '../actions/PlaylistActionCreators';

import { roomHistoryWithVotesSelector } from '../selectors/roomHistorySelectors';
import RoomHistory from '../components/RoomHistory';

const selectionOrOne = (media, selection) => {
  // History entries store the played media on their `.media` property
  if (selection.isSelected(media)) {
    return selection.get().map(item => item.media);
  }
  return [ media.media ];
};

const mapStateToProps = createStructuredSelector({
  media: roomHistoryWithVotesSelector
});

const onOpenAddMediaMenu = (position, media, selection) =>
  addMediaMenu(selectionOrOne(media, selection), position);
const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenAddMediaMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomHistory);
