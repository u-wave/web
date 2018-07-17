import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import SkipIcon from '@material-ui/icons/SkipNext';
import SkipReasonsList from './SkipReasonsList';

const popoverPosition = {
  marginThreshold: 0,
  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
  transformOrigin: { horizontal: 'center', vertical: 'bottom' },
};

// TODO not hardcode these maybe?
const reasons = [
  'genre',
  'history',
  'unavailable',
  'nsfw',
  'duration',
  'downvotes',
  'other',
];

class SkipButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    userIsDJ: PropTypes.bool.isRequired,
    currentDJ: PropTypes.object.isRequired,
    onSkip: PropTypes.func.isRequired,
  };

  state = {
    isSkipping: false,
    isOpen: false,
    anchor: null,
  };

  handleOpen = (event) => {
    const { userIsDJ } = this.props;

    if (userIsDJ) {
      this.handleSkip('');
      return;
    }

    this.setState({
      isOpen: true,
      anchor: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleSkip = (reason) => {
    const { onSkip } = this.props;

    this.setState({ isSkipping: true });
    Promise.resolve(onSkip(reason)).finally(() => {
      this.setState({ isSkipping: false });
    });
    this.handleClose();
  };

  render() {
    const { t, userIsDJ, currentDJ } = this.props;
    const { isSkipping, isOpen, anchor } = this.state;

    if (isSkipping) {
      return (
        <span>
          <div className="SkipButton is-loading">
            <CircularProgress className="SkipButton-loader" />
          </div>
        </span>
      );
    }

    let message = t('booth.skip.self');
    if (!userIsDJ) {
      message = t('booth.skip.other', { user: currentDJ.username });
    }

    return (
      <span>
        <Tooltip title={message}>
          <IconButton className="SkipButton" onClick={this.handleOpen}>
            <SkipIcon />
          </IconButton>
        </Tooltip>
        <Popover
          open={isOpen}
          anchorEl={anchor}
          onClose={this.handleClose}
          classes={{ paper: 'SkipButton-list' }}
          {...popoverPosition}
        >
          <SkipReasonsList
            reasons={reasons.map(name => ({
              name,
              label: t(`booth.skip.reasons.${name}`),
            }))}
            onSelect={this.handleSkip}
          />
        </Popover>
      </span>
    );
  }
}

export default compose(
  translate(),
  pure,
)(SkipButton);
