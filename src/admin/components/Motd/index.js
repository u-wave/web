import * as React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import parse from 'u-wave-parse-chat-markup';
import compile from '../../../components/Chat/Markup/compile';

import './index.css';

const enhance = compose(
  withState('newMotd', 'setMotd', props => props.motd),
  withProps(props => ({
    parsedMotd: compile(parse(props.newMotd), props.compileOptions)
  })),
  withHandlers({
    onChange: props => (event) => {
      props.setMotd(event.target.value);
    },
    onSubmit: props => () => {
      props.onSetMotd(props.newMotd);
    }
  }),
  muiThemeable()
);

const Motd = ({
  muiTheme,
  canChangeMotd,
  newMotd,
  parsedMotd,
  onChange,
  onSubmit
}) => (
  <Card className="AdminMotd">
    <CardHeader
      title="Message of the Day"
      showExpandableButton={canChangeMotd}
      closeIcon={<EditIcon color="#fff" />}
    />
    <CardText>{parsedMotd}</CardText>
    <CardText expandable style={{ paddingTop: 0 }}>
      <textarea
        className="AdminMotd-field"
        rows={4}
        autoFocus
        onChange={onChange}
        value={newMotd}
      />
    </CardText>
    <CardActions expandable>
      <FlatButton
        onTouchTap={onSubmit}
        label="Save"
        backgroundColor={muiTheme.palette.primary1Color}
        hoverColor={muiTheme.palette.primary2Color}
        rippleColor={muiTheme.palette.primary3Color}
      />
    </CardActions>
  </Card>
);

Motd.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  canChangeMotd: React.PropTypes.bool,
  newMotd: React.PropTypes.string.isRequired,
  parsedMotd: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

Motd.defaultProps = {
  canChangeMotd: false
};

export default enhance(Motd);
