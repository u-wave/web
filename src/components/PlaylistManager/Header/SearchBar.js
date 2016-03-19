import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import muiThemeable from 'material-ui/lib/muiThemeable';

import SourcePicker from './SourcePicker';

@muiThemeable
export default class SearchBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    source: PropTypes.string,
    onSubmit: PropTypes.func,
    onSourceChange: PropTypes.func,
    muiTheme: PropTypes.object.isRequired
  };

  state = { focused: false };

  onFocus() {
    this.setState({ focused: true });
  }
  onBlur() {
    this.setState({ focused: false });
  }

  onKeyDown(e) {
    const { onSubmit } = this.props;
    if (e.key === 'Enter') {
      onSubmit(this.refs.value.value);
    }
  }

  render() {
    const { source, onSourceChange, muiTheme } = this.props;
    const { focused } = this.state;
    return (
      <div className={cx('SearchBar', focused ? 'is-focused' : '', this.props.className)}>
        <div className="SearchBar-icon">
          <SearchIcon color={muiTheme.rawTheme.palette.textColor} />
        </div>
        <SourcePicker
          className="SearchBar-source"
          selected={source}
          onChange={onSourceChange}
        />
        <div className="SearchBar-query">
          <input
            ref="value"
            className="SearchBar-input"
            type="text"
            placeholder={focused ? '' : 'Search'}
            onFocus={::this.onFocus}
            onBlur={::this.onBlur}
            onKeyDown={::this.onKeyDown}
          />
        </div>
      </div>
    );
  }
}
