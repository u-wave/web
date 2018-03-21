import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Motd from '../components/Motd';
import { setMotd } from '../../actions/ChatActionCreators';
import {
  rawMotdSelector,
  markupCompilerOptionsSelector,
} from '../../selectors/chatSelectors';
import { canChangeMotdSelector } from '../selectors/authSelectors';

const mapStateToProps = createStructuredSelector({
  motd: rawMotdSelector,
  compileOptions: markupCompilerOptionsSelector,
  canChangeMotd: canChangeMotdSelector,
});

const mapDispatchToProps = {
  onSetMotd: setMotd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Motd);
