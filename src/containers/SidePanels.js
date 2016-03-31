import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPanel } from '../actions/PanelSelectActionCreators';
import { userCountSelector } from '../selectors/userSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector
} from '../selectors/waitlistSelectors';

import SidePanels from '../components/SidePanels';

const mapStateToProps = createStructuredSelector({
  selectedPanel: state => state.selectedPanel,
  waitlistPosition: waitlistPositionSelector,
  waitlistSize: waitlistSizeSelector,
  onlineUsersCount: userCountSelector
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onChange: selectPanel
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanels);
