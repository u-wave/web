import * as React from 'react';
import debounce from 'lodash/debounce';

export default class PlaylistFilter extends React.Component {
  static propTypes = {
    onFilter: React.PropTypes.func.isRequired
  };

  state = {
    open: false,
    value: ''
  };

  onFilter = debounce(value => {
    this.props.onFilter(value);
  }, 200);

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.onFilter(event.target.value);
  };

  render() {
    return (
      <div className="PlaylistMediaFilter">
        <input
          type="text"
          className="PlaylistMediaFilter-input"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
