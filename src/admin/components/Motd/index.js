import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import parse from 'u-wave-parse-chat-markup';
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
            <EditIcon />
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
