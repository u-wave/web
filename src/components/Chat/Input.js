import cx from 'classnames';
import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class Input extends React.Component {
  static propTypes = {
    send: PropTypes.func
  };

  state = { focused: false };

  onFocus() {
    this.setState({ focused: true });
  }
  onBlur() {
    this.setState({ focused: false });
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      const value = e.target.value.trim();
      if (value.length > 0) {
        this.props.send(value);
      }
      e.target.searchText = '';
    }
  }

  handleSelect() { this.setState({ searchText: '' }); }
  handleUpdateInput(t) { this.setState({ searchText: t }); }

  render() {
    const dataSource = [ '/skip', '/setrole', '/wladd', '/wlremove' ];
    const { focused } = this.state;
    const focusClass = focused ? 'is-focused' : '';

    return (
      <div className={cx('ChatInput', focusClass)}>
      <AutoComplete
      className={cx('ChatInput-input', focusClass)}
        fullWidth={false}
        style={{
          width: '95%',
          color: '#000'
        }}
      hintText="Click here to chat!"
      filter={AutoComplete.fuzzyFilter}
        dataSource={dataSource}
        onKeyDown={::this.onKeyDown}
        searchText={this.state.searchText}
        searchText={this.state.searchText}
        onNewRequest={this.handleSelect.bind(this)}
        onUpdateInput={this.handleUpdateInput.bind(this)}
          />
      </div>
    );
  }
}
