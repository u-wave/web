import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import SearchIcon from 'material-ui/svg-icons/action/search';
import SourcePicker from './SourcePicker';

const enhance = translate();

class SearchBar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    source: PropTypes.string,
    onSubmit: PropTypes.func,
    t: PropTypes.func.isRequired,
    onSourceChange: PropTypes.func
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
    const { t, source, onSourceChange } = this.props;
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
            placeholder={focused ? '' : t('playlists.search.action')}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

export default enhance(SearchBar);
