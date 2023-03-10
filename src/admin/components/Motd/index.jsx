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
import compile from '../../../components/Chat/Markup/compile';

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
  canChangeMotd = false,
  onSetMotd,
}) {
  const [newMotd, setMotd] = useState(initialMotd);
  const [expanded, setExpanded] = useState(false);
  const parsedMotd = useMemo(
    () => {
      if (newMotd == null) {
        return null;
      }
      return compile(parse(newMotd), compileOptions);
    },
    [newMotd, compileOptions],
  );
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
      <CardContent>{parsedMotd}</CardContent>
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
  canChangeMotd: PropTypes.bool,
  onSetMotd: PropTypes.func.isRequired,
};

export default Motd;
