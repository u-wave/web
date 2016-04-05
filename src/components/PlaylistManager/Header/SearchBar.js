import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import SourcePicker from './SourcePicker';

export default class SearchBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    source: PropTypes.string,
    onSubmit: PropTypes.func,
    onSourceChange: PropTypes.func
  };

  state = { focused: false };

  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleKeyDown = e => {
    const { onSubmit } = this.props;
    if (e.key === 'Enter') {
      onSubmit(this.refs.value.value);
    }
  };

  render() {
    const { source, onSourceChange } = this.props;
    const { focused } = this.state;
    return (
      <div className={cx('SearchBar', focused ? 'is-focused' : '', this.props.className)}>
        <div className="SearchBar-icon">
          <SearchIcon color="#fff" />
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
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}
