import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import SkipIcon from 'material-ui/svg-icons/av/skip-next';
import Loader from '../Loader';
import SkipReasonsList from './SkipReasonsList';

const fullSizeStyle = {
  height: '100%',
  width: '100%'
};

const popoverProps = {
  anchorOrigin: { horizontal: 'middle', vertical: 'bottom' },
  targetOrigin: { horizontal: 'middle', vertical: 'bottom' }
};

// TODO not hardcode these maybe?
const reasons = [
  'genre',
  'history',
  'unavailable',
  'nsfw',
  'duration',
  'downvotes',
  'other'
];

class SkipButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    userIsDJ: PropTypes.bool.isRequired,
    currentDJ: PropTypes.object.isRequired,
    onSkip: PropTypes.func.isRequired
  };

  state = {
    isSkipping: false,
    isOpen: false,
    anchor: null
  };

  handleOpen = (event) => {
    if (this.props.userIsDJ) {
      this.handleSkip('');
      return;
    }

    this.setState({
      isOpen: true,
      anchor: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleSkip = (reason) => {
    this.setState({ isSkipping: true });
    Promise.resolve(this.props.onSkip(reason)).then(() => {
      this.setState({ isSkipping: false });
    });
    this.handleClose();
  };

  render() {
    const { t } = this.props;

    if (this.state.isSkipping) {
      return (
        <span>
          <div className="SkipButton is-loading">
            <Loader size="tiny" className="SkipButton-loader" />
          </div>
        </span>
      );
    }

    let message = t('booth.skip.self');
    if (!this.props.userIsDJ) {
      message = t('booth.skip.other', { user: this.props.currentDJ.username });
    }

    return (
      <span>
        <IconButton
          tooltip={message}
          tooltipPosition="top-center"
          style={fullSizeStyle}
          onClick={this.handleOpen}
        >
          <SkipIcon />
        </IconButton>
        <Popover
          open={this.state.isOpen}
          anchorEl={this.state.anchor}
          onRequestClose={this.handleClose}
          {...popoverProps}
        >
          <SkipReasonsList
            reasons={reasons.map(name => ({
              name,
              label: t(`booth.skip.reasons.${name}`)
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
  pure
)(SkipButton);
