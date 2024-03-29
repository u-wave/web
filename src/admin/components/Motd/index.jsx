import React from 'react';
import PropTypes from 'prop-types';
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
import Markup from '../../../components/Chat/Markup';
import useHasRole from '../../../hooks/useHasRole';

const {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} = React;

function Motd({
  initialMotd,
  compileOptions,
  onSetMotd,
}) {
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
  const onChange = useCallback((event) => {
    setMotd(event.target.value);
  }, []);
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    onSetMotd(newMotd);
    setExpanded(false);
  }, [newMotd, onSetMotd]);
  const input = useRef(null);
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

Motd.propTypes = {
  initialMotd: PropTypes.string,
  compileOptions: PropTypes.object.isRequired,
  onSetMotd: PropTypes.func.isRequired,
};

export default Motd;
