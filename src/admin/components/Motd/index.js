import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
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

const enhance = compose(
  withState('newMotd', 'setMotd', ({ motd }) => motd),
  withState('expanded', 'setExpanded', false),
  withProps((props) => {
    const {
      newMotd, compileOptions, expanded, setExpanded,
    } = props;

    return {
      parsedMotd: compile(parse(newMotd), compileOptions),
      onExpand: () => setExpanded(!expanded),
    };
  }),
  withHandlers({
    onChange: ({ setMotd }) => (event) => {
      setMotd(event.target.value);
    },
    onSubmit: props => (event) => {
      const { onSetMotd, newMotd, setExpanded } = props;

      event.preventDefault();
      onSetMotd(newMotd);
      setExpanded(false);
    },
  }),
);

function autoFocus(el) {
  if (el) el.focus();
}

const Motd = ({
  canChangeMotd,
  newMotd,
  parsedMotd,
  expanded,
  onChange,
  onSubmit,
  onExpand,
}) => (
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
            ref={autoFocus}
          />
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant="raised"
            color="primary"
          >
            Save
          </Button>
        </CardActions>
      </form>
    </Collapse>
  </Card>
);

Motd.propTypes = {
  canChangeMotd: PropTypes.bool,
  newMotd: PropTypes.string.isRequired,
  parsedMotd: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
};

Motd.defaultProps = {
  canChangeMotd: false,
};

export default enhance(Motd);
