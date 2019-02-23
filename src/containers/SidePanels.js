import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { listenerCountSelector } from '../selectors/userSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector,
} from '../selectors/waitlistSelectors';
import SidePanels from '../components/SidePanels';

const mapStateToProps = createStructuredSelector({
  waitlistPosition: waitlistPositionSelector,
  waitlistSize: waitlistSizeSelector,
  listenerCount: listenerCountSelector,
});

const enhance = connect(mapStateToProps);

export default enhance(SidePanels);
