import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import injectMediaSources from '../../../utils/injectMediaSources';
import SourcePickerElement from './SourcePickerElement';

const enhance = injectMediaSources();

const popoverPosition = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  transformOrigin: { vertical: 'top', horizontal: 'left' },
};

class SourcePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.string,
    onChange: PropTypes.func,

    getMediaSource: PropTypes.func.isRequired,
    getAllMediaSources: PropTypes.func.isRequired,
  };

  state = { open: false };

  handleOpen = () => {
    this.setState({
      open: true,
      anchor: this.container,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (sourceName) => {
    const { onChange } = this.props;

    this.handleClose();
    onChange(sourceName);
  }

  refContainer = (container) => {
    this.container = container;
  };

  createElement(sourceName) {
    const { selected, getMediaSource } = this.props;

    return (
      <button
        type="button"
        className="SourcePicker-item"
        key={sourceName}
        onClick={() => this.handleChange(sourceName)}
      >
        <SourcePickerElement
          name={sourceName}
          source={getMediaSource(sourceName)}
          active={selected === sourceName}
        />
      </button>
    );
  }

  render() {
    const {
      className,
      selected,
      getMediaSource,
      getAllMediaSources,
    } = this.props;
    const { open, anchor } = this.state;

    const sourceNames = Object.keys(getAllMediaSources());
    const sources = sourceNames
      .filter(name => name !== selected)
      .map(name => this.createElement(name));

    return (
      <div
        className={cx('SourcePicker', className)}
        ref={this.refContainer}
      >
        <button
          type="button"
          className="SourcePicker-active"
          onClick={this.handleOpen}
        >
          <SourcePickerElement
            name={selected}
            source={getMediaSource(selected)}
            active
          />
          <ArrowIcon className="SourcePicker-arrow" />
        </button>
        <Popover
          classes={{ paper: 'SourcePicker-list' }}
          open={open}
          anchorEl={anchor}
          onClose={this.handleClose}
          {...popoverPosition}
        >
          {sources}
        </Popover>
      </div>
    );
  }
}

export default enhance(SourcePicker);
