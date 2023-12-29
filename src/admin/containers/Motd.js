import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Motd from '../components/Motd';
import { motdSourceSelector, setMotd } from '../../reducers/chat';
import { markupCompilerOptionsSelector } from '../../selectors/chatSelectors';
import { canChangeMotdSelector } from '../selectors/authSelectors';

const mapStateToProps = createStructuredSelector({
  initialMotd: motdSourceSelector,
  compileOptions: markupCompilerOptionsSelector,
  canChangeMotd: canChangeMotdSelector,
});

const mapDispatchToProps = {
  onSetMotd: setMotd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Motd);
