import React from 'react';
import PropTypes from 'prop-types';
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
  showTooltip: PropTypes.bool.isRequired,
  onShowTooltip: PropTypes.func.isRequired,
  onHideTooltip: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default enhance(Emoji);
