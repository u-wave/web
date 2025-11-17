import { motdSourceSelector, setMotd } from '../../reducers/chat';
import { markupCompilerOptionsSelector } from '../../selectors/chatSelectors';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import { CompileOptionsContext } from '../../components/Chat/Markup';
import Motd from '../components/Motd';

function MotdContainer() {
  const dispatch = useDispatch();
  const initialMotd = useSelector(motdSourceSelector);
  const compileOptions = useSelector(markupCompilerOptionsSelector);
  const onSetMotd = (motd: string | null) => dispatch(setMotd(motd));

  return (
    <CompileOptionsContext value={compileOptions}>
      <Motd initialMotd={initialMotd} onSetMotd={onSetMotd} />
    </CompileOptionsContext>
  );
}

export default MotdContainer;
