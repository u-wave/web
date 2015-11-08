import cx from 'classnames';
import React from 'react';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import SourcePicker from './SourcePicker';

const ENTER_KEY = 13;

export default class SearchBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    source: React.PropTypes.string,
    onSubmit: React.PropTypes.func
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
    if (e.keyCode === ENTER_KEY) {
      onSubmit(this.refs.value.value);
    }
  }

  render() {
    const { source } = this.props;
    const { focused } = this.state;
    return (
      <div className={cx('SearchBar', focused ? 'is-focused' : '', this.props.className)}>
        <div className="SearchBar-icon">
          <SearchIcon color="#fff" />
        </div>
        <SourcePicker
          className="SearchBar-source"
          selected={source}
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
