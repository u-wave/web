import cx from 'classnames';
import * as React from 'react';
import { compose } from 'redux';
import Popover from 'material-ui/Popover';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import muiThemeable from 'material-ui/styles/muiThemeable';

import injectMediaSources from '../../../utils/injectMediaSources';
import SourcePickerElement from './SourcePickerElement';

class SourcePicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    selected: React.PropTypes.string,
    onChange: React.PropTypes.func,

    muiTheme: React.PropTypes.object.isRequired,
    getAllMediaSources: React.PropTypes.func.isRequired
  };

  state = { open: false };

  createElement(sourceName) {
    const { selected, onChange } = this.props;
    return (
      <button
        className="SourcePicker-item"
        key={sourceName}
        onClick={() => onChange(sourceName)}
      >
        <SourcePickerElement
          name={sourceName}
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
