import * as React from 'react';
import withState from 'recompose/withState';
import Tooltip from 'material-ui/internal/Tooltip';
import transformStyle from '../../../utils/transformStyle';

const MUI_TOOLTIP_HEIGHT = 22;

const tooltipStyle = {
  left: '50%',
  textIndent: 'initial',
  // Put tooltips directly above the emoji. material-ui has them slightly
  // overlaying the emoji by default, which is a bit ugly since emoji are very
  // small to begin with.
  top: -MUI_TOOLTIP_HEIGHT,
  ...transformStyle('translateX(-50%)')
};

const enhance = withState('showTooltip', 'setShowTooltip', false);

const Emoji = ({
  name,
  image,
  showTooltip,
  setShowTooltip,
  ...props
}) => (
  <span
    {...props}
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}
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
  setShowTooltip: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired
};

export default enhance(Emoji);
