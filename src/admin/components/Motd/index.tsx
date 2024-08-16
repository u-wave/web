import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { mdiPencil } from '@mdi/js';
import parse from 'u-wave-parse-chat-markup';
import SvgIcon from '../../../components/SvgIcon';
import Markup, { type CompileOptions } from '../../../components/Chat/Markup';
import useHasRole from '../../../hooks/useHasRole';

type MotdProps = {
  initialMotd: string | null,
  // TODO: CompileOptions should probably be on the context
  compileOptions: CompileOptions,
  onSetMotd: (newMotd: string | null) => void,
};
function Motd({
  initialMotd,
  compileOptions,
  onSetMotd,
}: MotdProps) {
  const [newMotd, setMotd] = useState(initialMotd);
  const [expanded, setExpanded] = useState(false);
  const canChangeMotd = useHasRole('moderator'); // TODO narrow?
  const parsedMotd = useMemo(() => {
    if (newMotd == null) {
      return null;
    }
    return parse(newMotd);
  }, [newMotd]);
  const onExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMotd(event.target.value);
  }, []);
  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSetMotd(newMotd);
    setExpanded(false);
  }, [newMotd, onSetMotd]);
  const input = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [expanded]);

  return (
    <Card className="AdminMotd">
      <CardHeader
        title="Message of the Day"
        action={canChangeMotd && (
          <IconButton onClick={onExpand}>
            <SvgIcon path={mdiPencil} />
          </IconButton>
        )}
      />
      <CardContent>
        {parsedMotd ? <Markup tree={parsedMotd} compileOptions={compileOptions} /> : null}
      </CardContent>
      <Collapse in={expanded} unmountOnExit>
        <form onSubmit={onSubmit}>
          <CardContent style={{ paddingTop: 0 }}>
            <textarea
              className="AdminMotd-field"
              rows={4}
              onChange={onChange}
              value={newMotd}
              ref={input}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </CardActions>
        </form>
      </Collapse>
    </Card>
  );
}

export default Motd;
