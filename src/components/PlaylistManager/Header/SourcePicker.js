import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Popover from 'material-ui/Popover';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import muiThemeable from 'material-ui/styles/muiThemeable';

import injectMediaSources from '../../../utils/injectMediaSources';
import SourcePickerElement from './SourcePickerElement';

class SourcePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.string,
    onChange: PropTypes.func,

    muiTheme: PropTypes.object.isRequired,
    getMediaSource: PropTypes.func.isRequired,
    getAllMediaSources: PropTypes.func.isRequired
  };

  state = { open: false };

  createElement(sourceName) {
    const { selected, getMediaSource, onChange } = this.props;
    return (
      <button
        className="SourcePicker-item"
        key={sourceName}
        onClick={() => onChange(sourceName)}
      >
        <SourcePickerElement
          name={sourceName}
          source={getMediaSource(sourceName)}
          active={selected === sourceName}
        />
      </button>
    );
  }

  handleOpen = () => {
    this.setState({
      open: true,
      anchor: this.container
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  refContainer = (container) => {
    this.container = container;
  };

  render() {
    const {
      className,
      selected,
      muiTheme,
      getMediaSource,
      getAllMediaSources
    } = this.props;

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
          className="SourcePicker-active"
          onClick={this.handleOpen}
        >
          <SourcePickerElement
            name={selected}
            source={getMediaSource(selected)}
            active
          />
          <ArrowIcon
            color={muiTheme.palette.textColor}
            style={{ height: '100%' }}
          />
        </button>
        <Popover
          className="SourcePicker-list"
          open={this.state.open}
          anchorEl={this.state.anchor}
          onRequestClose={this.handleClose}
        >
          {sources}
        </Popover>
      </div>
    );
  }
}

export default compose(
  injectMediaSources(),
  muiThemeable()
)(SourcePicker);
