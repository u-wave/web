import cx from 'classnames';
import * as React from 'react';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SourcePicker from './SourcePicker';

export default class SearchBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    source: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    onSourceChange: React.PropTypes.func
  };

  state = { focused: false };

  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleKeyDown = (e) => {
    const { onSubmit } = this.props;
    if (e.key === 'Enter') {
      onSubmit(this.input.value);
    }
  };

  refInput = (input) => {
    this.input = input;
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
            ref={this.refInput}
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
