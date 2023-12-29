import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Motd from '../components/Motd';
import { motdSourceSelector, setMotd } from '../../reducers/chat';
import { markupCompilerOptionsSelector } from '../../selectors/chatSelectors';

const mapStateToProps = createStructuredSelector({
  initialMotd: motdSourceSelector,
  compileOptions: markupCompilerOptionsSelector,
});

const mapDispatchToProps = {
  onSetMotd: setMotd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Motd);
