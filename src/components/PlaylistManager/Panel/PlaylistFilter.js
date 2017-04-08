import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
import IconButton from 'material-ui/IconButton';
import FilterIcon from 'material-ui/svg-icons/action/search';

class PlaylistFilter extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired
  };

  state = {
    open: false,
    value: ''
  };

  onFilter = debounce((value) => {
    this.props.onFilter(value);
  }, 200);

  clearFilter() {
    if (this.state.value !== '') {
      this.props.onFilter('');
    }
  }

  handleClick = () => {
    const isOpen = !this.state.open;

    if (!isOpen) {
      this.clearFilter();
    }

    this.setState({
      open: isOpen,
      value: ''
    }, () => {
      if (isOpen) {
        this.input.focus();
      }
    });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.onFilter(event.target.value);
  };

  refInput = (input) => {
    this.input = input;
  };

  render() {
    const { t } = this.props;
    const isOpen = this.state.open;
    return (
      <div className="PlaylistMediaFilter">
        <IconButton
          onClick={this.handleClick}
          tooltip={t('playlists.filter')}
          tooltipPosition="top-center"
        >
          <FilterIcon color={isOpen ? '#fff' : '#555'} hoverColor="#fff" />
        </IconButton>
        <input
          type="text"
          ref={this.refInput}
          className={cx('PlaylistMediaFilter-input', isOpen && 'is-open')}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default translate()(PlaylistFilter);
