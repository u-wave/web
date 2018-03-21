import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPanel } from '../actions/PanelSelectActionCreators';
import { listenerCountSelector } from '../selectors/userSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector,
} from '../selectors/waitlistSelectors';

import SidePanels from '../components/SidePanels';

const mapStateToProps = createStructuredSelector({
  selected: state => state.selectedPanel,
  waitlistPosition: waitlistPositionSelector,
  waitlistSize: waitlistSizeSelector,
  listenerCount: listenerCountSelector,
});

function mapDispatchToProps(dispatch) {
  return {
    onChange: (panelName) => {
      // Ensure that we're actually switching panels--otherwise change events
      // from eg. the chat box bubble up and trigger a panel rerender on every
      // keypress.
      if (typeof panelName === 'string') {
        dispatch(selectPanel(panelName));
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanels);
