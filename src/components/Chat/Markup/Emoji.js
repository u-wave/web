import * as React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import Tooltip from '../../Tooltip';

const tooltipStyle = {
  textIndent: 'initial'
};

const enhance = compose(
  withState('showTooltip', 'setShowTooltip', false),
  withProps(props => ({
    onShowTooltip() { props.setShowTooltip(true); },
    onHideTooltip() { props.setShowTooltip(false); }
  }))
);

const Emoji = ({
  name,
  image,
  showTooltip,
  onShowTooltip,
  onHideTooltip
}) => (
  <span
    onMouseEnter={onShowTooltip}
    onMouseLeave={onHideTooltip}
    className="Emoji"
    style={{ backgroundImage: `url(/assets/emoji/${image})` }}
    data-emoji={name}
  >
    <Tooltip
      label={`:${name}:`}
      verticalPosition="top"
      horizontalPosition="center"
      show={showTooltip}
      style={tooltipStyle}
    />
    {`:${name}:`}
  </span>
);

Emoji.propTypes = {
  showTooltip: React.PropTypes.bool.isRequired,
  onShowTooltip: React.PropTypes.func.isRequired,
  onHideTooltip: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired
};

export default enhance(Emoji);
