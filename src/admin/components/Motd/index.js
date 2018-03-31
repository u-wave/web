import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui-next/Card'; // eslint-disable-line
import Button from 'material-ui-next/Button'; // eslint-disable-line
import IconButton from 'material-ui-next/IconButton'; // eslint-disable-line
import Collapse from 'material-ui-next/transitions/Collapse'; // eslint-disable-line
import EditIcon from 'material-ui-icons/ModeEdit';
import parse from 'u-wave-parse-chat-markup';
import compile from '../../../components/Chat/Markup/compile';

const enhance = compose(
  withState('newMotd', 'setMotd', props => props.motd),
  withState('expanded', 'setExpanded', false),
  withProps(props => ({
    parsedMotd: compile(parse(props.newMotd), props.compileOptions),
    onExpand: () => props.setExpanded(!props.expanded),
  })),
  withHandlers({
    onChange: props => (event) => {
      props.setMotd(event.target.value);
    },
    onSubmit: props => () => {
      props.onSetMotd(props.newMotd);
      props.setExpanded(false);
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
          variant="raised"
          color="primary"
          onClick={onSubmit}
        >
          Save
        </Button>
      </CardActions>
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
