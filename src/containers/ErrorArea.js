import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dismiss } from '../actions/ErrorActionCreators';
import { firstErrorSelector } from '../selectors/errorSelectors';

import ErrorArea from '../components/ErrorArea';

const mapStateToProps = state => ({
  error: firstErrorSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onDismiss: dismiss,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorArea);
