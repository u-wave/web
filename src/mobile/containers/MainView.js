import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectPanel } from '../../actions/PanelSelectActionCreators';
import MainView from '../components/MainView';

const mapStateToProps = createStructuredSelector({
  selected: state => state.selectedPanel
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onTabChange: selectPanel
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
